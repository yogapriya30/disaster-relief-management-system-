from app.security.authentication import hash_password, verify_password, create_access_token, decode_access_token

def test_password_hashing():
    password = "mypassword123"
    hashed = hash_password(password)
    
    assert hashed != password
    assert verify_password(password, hashed) == True
    assert verify_password("wrongpassword", hashed) == False


def test_jwt_token_creation_and_decode():
    data = {"sub": "1", "email": "test@example.com"}
    token = create_access_token(data)
    
    assert token is not None
    assert isinstance(token, str)
    
    decoded = decode_access_token(token)
    assert decoded["email"] == "test@example.com"


def test_jwt_invalid_token_returns_none():
    invalid_token = "this.is.not.a.valid.token"
    result = decode_access_token(invalid_token)
    
    assert result is None