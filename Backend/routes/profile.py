from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.auth_service import get_current_user

router = APIRouter()

@router.get("/get_User/{token}", summary="Verify token via URL with detailed information")
def Get_User_data(token: str, db: Session = Depends(get_db)):
    results= {
        "id_User": None,
        "name": None,
        "last_name": None,
        "email": None,
        "fk_Subscription": None
    }

    user = get_current_user(db, token)
    
    results["id_User"]=user.id_User
    results["name"]=user.name
    results["last_name"]=user.last_name
    results["email"]=user.email
    results["fk_Subscription"]=user.fk_Subscription
    
    return results

