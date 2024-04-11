CREATE TABLE uzytkownicy(
    id integer auto_increment PRIMARY KEY,
    login varchar(20) NOT NULL,
    password varchar(50) NOT NULL,
    create_date date
);
CREATE TABLE posty(
    id integer auto_increment PRIMARY KEY,
    userId integer ,
    title varchar(20),
    description varchar(20),
    create_date date,
    FOREIGN KEY (userId) REFERENCES uzytkownicy(id)
);
CREATE TABLE komentarze(
    id integer auto_increment PRIMARY KEY,
    userId integer NOT NULL,
    postId integer NOT NULL,
    content varchar(600),
    create_date date,
    FOREIGN KEY (userId) REFERENCES uzytkownicy(id),
    FOREIGN KEY (postId) REFERENCES posty(id)
)
