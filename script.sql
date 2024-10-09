drop database if exists gestion_recette;
create database if not exists gestion_recette;

use gestion_recette;

create table recettes(
   id int auto_increment,
   titre varchar(100) not null,
   ingredients text not null,
   type varchar(20) not null,
   constraint pk_recette primary key(id)
);

create table categories(
   id int auto_increment,
   nom varchar(100) not null,
   constraint pk_categorie primary key(id)
);

alter table recettes add column categorie_id int not null;

alter table recettes add constraint fk_category foreign key(categorie_id) references categories(id) on delete restrict;

INSERT INTO `categories` (id, nom) VALUES 
(1,'Plat Principal'),
(2,'Dessert'),
(3,'Salade'),
(4,'Apéritif'),
(5,'Boisson Naturel'),
(7,'Menu Espagnol'),
(8,'Menu Italien'),
(9,'Patisserie Française'),
(11,'Plat salée'),
(13,'Menu Italien'),
(20,'Plat salée Inde'),
(22,'Brunch');


INSERT INTO `recettes` (id, titre, ingredients, type, categorie_id) VALUES 
(6,'Gateau Au Chocolat','farine, oeufs, lait , chocolat, sucre','Dessert',2),
(10,'Pancakes','farine, oeuf, lait, sucre','Dessert',2),
(13,'Spaghetti bolognaises','pates, viandes, tomates, huile, épices, fromage','Plat',1),
(14,'Iced tea','thé, glaçon, crème fraîche','Dessert',2),
(15,'Riz au poulets','riz, poulet, huile, oignons, epices','Entrée',1),
(16,'Pané poulets','poulet, farine, epices, oeufs','Entrée',1),
(17,'Maffé Avec Viande','viande, tomates, arachide, légumes','Entrée',8),
(18,'Cappucino','café, crême fraiche','Dessert',2),
(29,'Riz à la viande DE Boeuf','riz, viande, oignones, huile, épices','Plat',1),
(30,'Omelette italienne','oeufs, jambon, fromage','Entrée',4),
(34,'Soupe kandia','huile rouge, viande, gombo, gambas','Plat',1),
(35,'Maffé Soninke','viandes, arachide','Plat',11),
(36,'Pancake Chocolat','farine, oeuf, lait, Chocolat','Dessert',2);

