import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
class NC(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
HTTPServer(('', int(sys.argv[1])), NC).serve_forever()
