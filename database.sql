CREATE TABLE uzytkownicy(
    id integer auto_increment PRIMARY KEY,
    login varchar(20) NOT NULL,
    password varchar(100) NOT NULL,
    create_date datetime
);
CREATE TABLE posty(
    id integer auto_increment PRIMARY KEY,
    userId integer,
    title varchar(100),
    description varchar(1000),
    likes integer,
    create_date datetime,
    FOREIGN KEY (userId) REFERENCES uzytkownicy(id)
);
CREATE TABLE komentarze(
    id integer auto_increment PRIMARY KEY,
    userId integer NOT NULL,
    postId integer NOT NULL,
    content varchar(600),
    create_date datetime,
    FOREIGN KEY (userId) REFERENCES uzytkownicy(id),
    FOREIGN KEY (postId) REFERENCES posty(id)
);

INSERT INTO `uzytkownicy` (`id`, `login`, `password`, `create_date`) VALUES
(1, 'xyz123', '$2b$10$ekz.D9bIwVCJf.W7pC6fRO7ufPBXJqWrQbX55TFQdKXSkj6Y3Yb4m', NULL),
(2, 'juanpablodos', '$2b$10$C01GAy.MJv.r1sKadjtaK.dpbSIWlchKj.2waODPnZ3iVf.D8f3MC', NULL),
(3, 'XxxtentacionxxX', '$2b$10$rttemfU3IcBUze627x4E9uT8ZxqYDUH.qmQbP1G3gbBCVoxuHphPi', NULL),
(4, 'AdolfKitler', '$2b$10$KjnW4UN3FrYOdcFB/SsBTe1g.5BUAqOYyr5OI9Ln2lRhyOHwneqB.', NULL),
(5, 's1mple', '$2b$10$Y7nly/rsDpgtasWhGWn/2OHZEjV6PrI0sRzZl1RRcqb11434skAr6', NULL),
(6, 'zywoo', '$2b$10$M2FE8AWFVYcgm7zyVY7/GeKaUuhKyZj53YQmk8KGgsXv8R1Okg5y6', NULL),
(7, '321rekin', '$2b$10$M6RJKegz7NMWZnwvkBZFYO1WI6ozjEbvrp9Zqon6DsMm24EcFJEMW', NULL),
(8, 'IsaacMother24', '$2b$10$aMlF87Q2.CC9Zi4viVAAkOqtQzcQeXil95T.i128TRnAAmBdilfEi', NULL);

INSERT INTO posty (userId, title, description, likes, create_date) VALUES
(4, 'Exploring the Grand Canyon', 'Just got back from an amazing trip to the Grand Canyon. The views were absolutely breathtaking!', 78, '2024-04-16'),
(3, 'Best Pizza in Town', 'Tried out this new pizza place downtown and it did not disappoint! Highly recommend the pepperoni with extra cheese.', 32, '2024-04-15'),
(7, 'Book Recommendation: The Alchemist', 'Recently finished reading The Alchemist by Paulo Coelho and it completely blew me away. Such a profound and inspiring book!', 45, '2024-04-14'),
(8, 'Hiking in Yosemite', 'Spent the weekend hiking in Yosemite National Park. The waterfalls were stunning!', 92, '2024-04-13');

INSERT INTO komentarze (userId, postId, content, create_date) VALUES
(2, 1, 'Wow, those photos must be stunning! I''ve always wanted to visit the Grand Canyon.', '2024-04-16'),
(4, 1, 'I visited the Grand Canyon last summer and it was indeed breathtaking! Did you do any hiking while you were there?', '2024-04-17'),
(5, 2, 'I''m a huge pizza fan! Thanks for the recommendation, I''ll have to try it out this weekend.', '2024-04-15'),
(3, 2, 'That sounds delicious! I''m always on the lookout for a good pizza place. Do they have any specialty pizzas?', '2024-04-16'),
(6, 3, 'The Alchemist is one of my all-time favorite books! It really makes you think about the journey of life.', '2024-04-14'),
(7, 3, 'I''ve heard great things about The Alchemist. Definitely adding it to my reading list!', '2024-04-15'),
(2, 4, 'Yosemite is such a beautiful place! Which trail did you hike?', '2024-04-13'),
(5, 4, 'I love hiking in Yosemite! Did you get a chance to see any wildlife?', '2024-04-14');
