import os


class Settings:
    def __init__(self,
                 host        : str = "0.0.0.0", 
                 port        : int = 8080,
                 db_user     : str = "flower",
                 db_passwd   : str = "TheFlowers381!",
                 db_dbname   : str = "eventfull",
                 db_host     : str = "maria",
                 db_port     : int = 3306) -> None:
        # Server
        self.host = host
        self.port = port
        
        # Database
        self.db_user    = db_user
        self.db_passwd  = db_passwd
        self.db_dbname  = db_dbname
        self.db_host = db_host
        self.db_port = db_port
    
settings = Settings()