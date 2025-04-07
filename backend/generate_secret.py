import secrets

# Generate a 32-byte (256-bit) random key
secret_key = secrets.token_urlsafe(32)
print(f"Generated JWT Secret Key: {secret_key}") 