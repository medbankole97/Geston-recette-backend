drop database if exists gestion_recette;
create database if not exists gestion_recette;

use gestion_recette;

create table recettes(
   id int auto_increment,
   titre varchar(50) not null,
   ingredients varchar(255) not null,
   type varchar(100) not null,
   constraint pk_recette primary key(id)
);

create table categories(
   id int auto_increment,
   nom varchar(50) not null,
   constraint pk_categorie primary key(id)
);

alter table recettes add column categorie_id int not null;

alter table recettes add constraint fk_category foreign key(categorie_id) references categories(id) on delete restrict;

insert into categories (nom) values
('Plat principal'),
('Dessert'),
('Salade'),
('Apéritif'),
('Boisson');

insert into recettes (titre, ingredients, type, categorie_id) values
('Spaghetti Carbonara', 'Spaghetti, eggs, bacon, Parmesan cheese, black pepper', 'Plat', 1),
('Chocolate Chip Cookies', 'Flour, sugar, butter, chocolate chips, eggs', 'Dessert', 2),
('Chicken Tikka Masala', 'Chicken, tomatoes, cream, spices', 'Plat', 3),
('Caesar Salad', 'Romaine lettuce, croutons, Parmesan cheese, dressing', 'Entrée', 1),
('Apple Pie', 'Apples, flour, sugar, butter, cinnamon', 'Dessert', 2);

