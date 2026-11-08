"""Dependency-free checks for the JIT MCP probe source.

Run: python -m unittest discover -s tests -v
This verifies source structure and syntax, NOT the MCP protocol handshake.
"""
import ast
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class IntegrationProbeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = (ROOT / "server.py").read_text(encoding="utf-8")
        cls.tree = ast.parse(cls.source, filename="server.py")

    def test_has_integration_ping(self):
        functions = [n for n in cls.tree.body if isinstance(n, ast.FunctionDef)]
        ping = next((n for n in functions if n.name == "integration_ping"), None)
        self.assertIsNotNone(ping)
        self.assertEqual(len(ping.args.args), 0)

    def test_explicitly_denies_device_connection(self):
        ping = next(n for n in self.tree.body if isinstance(n, ast.FunctionDef) and n.name == "integration_ping")
        returns = [n for n in ast.walk(ping) if isinstance(n, ast.Return)]
        self.assertEqual(len(returns), 1)
        mapping = returns[0].value
        self.assertIsInstance(mapping, ast.Dict)
        fields = {k.value: v for k, v in zip(mapping.keys, mapping.values) if isinstance(k, ast.Constant)}
        self.assertIn("connected_device", fields)
        self.assertIsInstance(fields["connected_device"], ast.Constant)
        self.assertIs(fields["connected_device"].value, False)

    def test_no_hardcoded_nonce(self):
        ping = next(n for n in self.tree.body if isinstance(n, ast.FunctionDef) and n.name == "integration_ping")
        mapping = next(n.value for n in ast.walk(ping) if isinstance(n, ast.Return))
        fields = {k.value: v for k, v in zip(mapping.keys, mapping.values) if isinstance(k, ast.Constant)}
        self.assertIsInstance(fields["nonce"], ast.Call)
        self.assertIsInstance(fields["observed_at"], ast.Call)

if __name__ == "__main__":
    unittest.main()
