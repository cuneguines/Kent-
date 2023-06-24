import json
import pytest
from app import app, db, User

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_create_user(client):
    response = client.post('/users', json={'name': 'Gd', 'email': 'gn@example.com'})
    assert response.status_code == 201
    data = response.get_json()
    assert data['name'] == 'Gd'
    assert data['email'] == 'gn@example.com'



def test_get_user(client):
    user = User(name='newuser', email='newuser@example.com')
    db.session.add(user)
    db.session.commit()

    response = client.get(f'/users/{user.id}')
    assert response.status_code == 200
    data = response.get_json()
    assert data['name'] == 'newuser'
    assert data['email'] == 'newuser@example.com'

def test_get_user_not_found(client):
    response = client.get('/users/999')
    assert response.status_code == 404
    data = response.get_json()
    assert data['error'] == 'User not found'
