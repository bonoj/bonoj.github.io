/* JIT WebView DOM runtime v1. Evaluated inside the active document by the native host.
 * No native bridge, network calls, cookies, localStorage or credential collection.
 * The native host must supply commands only after authentication and authorization.
 */
(function () {
  "use strict";
  const prior = globalThis.__jitDomRuntime;
  if (prior && prior.version === 1) return;
  const state = { version: 1, revision: 0, refs: new Map(), serial: 0 };
  const maxText = 3000, maxControls = 80;
  const sensitive = /password|passcode|secret|token|api.?key|auth|credit|card|cvv|cvc|ssn|otp|verification/i;
  function protectedField(el) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return false;
    return sensitive.test([el.type, el.name, el.id, el.autocomplete, el.getAttribute('aria-label'), el.placeholder].join(' '));
  }
  function visible(el) {
    const style = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" &&
      Number(style.opacity) !== 0 && r.width > 0 && r.height > 0;
  }
  function label(el) {
    const by = el.getAttribute("aria-labelledby");
    const fromIds = by ? by.split(/\s+/).map(id => document.getElementById(id)?.textContent || "").join(" ") : "";
    const fromLabel = el.labels ? Array.from(el.labels).map(x => x.textContent || "").join(" ") : "";
    return (el.getAttribute("aria-label") || fromIds || fromLabel || el.getAttribute("placeholder") ||
      el.innerText || el.textContent || "").trim().slice(0, 180);
  }
  function role(el) {
    return el.getAttribute("role") || ({ BUTTON: "button", A: "link", INPUT: "textbox",
      TEXTAREA: "textbox", SELECT: "combobox" }[el.tagName] || "control");
  }
  function snapshot() {
    state.revision++;
    state.refs.clear();
    const controls = [];
    for (const el of document.querySelectorAll("a[href],button,input,select,textarea,[role=button],[contenteditable=true]")) {
      if (controls.length >= maxControls) break;
      if (!visible(el)) continue;
      const ref = "e" + (++state.serial);
      state.refs.set(ref, el);
      const secret = protectedField(el);
      controls.push({ ref, role: role(el), name: secret ? "[sensitive field]" : label(el), type: el.getAttribute("type") || "",
        disabled: !!el.disabled, value: secret ? null : ("value" in el ? String(el.value).slice(0, 180) : null) });
    }
    return { runtime_version: 1, revision: state.revision, url: location.href,
      title: document.title, text: (document.body?.innerText || "").slice(0, maxText),
      controls, observed_at: new Date().toISOString() };
  }
  function act(command) {
    if (!command || typeof command !== "object") return { error: "invalid_command" };
    if (command.operation === "observe") return { ok: true, observation: snapshot() };
    if (!Number.isSafeInteger(command.expected_revision) || command.expected_revision !== state.revision)
      return { error: "stale_observation", current_revision: state.revision };
    const el = state.refs.get(command.ref);
    if (!el || !el.isConnected || !visible(el)) return { error: "stale_element" };
    if (command.operation === "click") {
      if (el.disabled) return { error: "disabled" };
      if (el.matches("input[type=submit],button[type=submit]") && el.form?.querySelector("input[type=password]")) return { error: "sensitive_form_requires_manual_submit" };
      el.click();
    } else if (command.operation === "fill") {
      if (typeof command.value !== "string" || command.value.length > 1000) return { error: "invalid_value" };
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement))
        return { error: "not_editable" };
      if (el.disabled || el.readOnly || el.type === "file") return { error: "not_editable" };
      if (protectedField(el)) return { error: "sensitive_field_requires_manual_input" };
      const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype :
        el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      if (!setter) return { error: "unsupported_field" };
      setter.call(el, command.value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      return { error: "unsupported_operation" };
    }
    // Synchronous postcondition only. Native host must await navigation/SPA settling and re-observe.
    return { ok: true, action_dispatched: true, observation: snapshot() };
  }
  Object.defineProperty(globalThis, "__jitDomRuntime", {
    value: Object.freeze({ version: 1, act }), configurable: true
  });
})();
