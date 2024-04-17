CREATE TABLE uzytkownicy(
    id integer auto_increment PRIMARY KEY,
    login varchar(20) NOT NULL,
    password varchar(100) NOT NULL,
    create_date date
);
CREATE TABLE posty(
    id integer auto_increment PRIMARY KEY,
    userId integer,
    title varchar(100),
    description varchar(1000),
    likes integer,
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
