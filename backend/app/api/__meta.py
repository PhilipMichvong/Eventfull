TITLE = "Application backbone"

DESCRIPTION = """

### **Eventfull** - backend API.

Jednostka uwierzytelniania, autoryzacji, rejestracji oraz innych funkcjonalności aplikacji.
"""

OPENAPI_URL = "/api/openapi.json"

VERSION = "1.0.0"

TAGS_METADATA = [  
    {
        "name" : "Login",
        "description" : "Uwierzytelnianie zarejestrowanych użytkowników"
    },
    {
        "name" : "Register",
        "description" : "Rejestracja nowych użytkowników"
    },
    {
        "name" : "Events",
        "description" : "Obsługa wydarzeń"
    },
]
