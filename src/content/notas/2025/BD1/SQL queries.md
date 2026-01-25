```sql
CREATE TABLE Department(
dept_id int(3),
dept_name varchar(20),
dept_phone varchar(15),

CONSTRAINT pk_dept PRIMARY KEY(dept_id)
);

CREATE TABLE Employee(
employee_id varchar(10),
employee_name varchar(30),
employee_mail varchar(30),
dept_id int(3),

CONSTRAINT pk_employee PRIMARY KEY(employee_id),
CONSTRAINT fk_dep FOREIGN KEY(dept_id)

REFERENCES Department(dept_id)
);

DESC Employee;



USE world;

# filtrar
SELECT * FROM city WHERE CountryCode="ARG";
# alias 
SELECT ci.Name AS city_name FROM city AS ci;

SELECT * FROM city WHERE CountryCode="ARG" AND Population>1000000;

DESC countrylanguage;
SELECT * FROM countrylanguage;

SELECT * FROM countrylanguage WHERE Language IN ("Spanish", "English") ORDER BY Language ASC, Percentage ASC;

USE world;




SELECT cl.CountryCode, c.Name, cl.Language
FROM country AS c, countrylanguage AS cl
WHERE cl.CountryCode=c.Code;

SELECT cu.customer_id AS customer_customer_id, cu.customer_name, cu.customer_city, o.customer_id AS orders_customer_id, o.orders_id, o.item_id
FROM customer AS cu
LEFT JOIN orders AS o ON cu.customer_id = o.customer_id;
# on es como where para joins


SELECT co.Name AS "country_name", ci.Name AS "city_name", cl.Language, ci.Population
FROM city AS ci, country AS co, countrylanguage AS cl
WHERE ci.CountryCode=cl.CountryCode AND cl.CountryCode=co.Code;

# self join
SELECT a.Name AS city_1, b.Name AS city_2, a.CountryCode
FROM city a, city b # SQL trata a "a" y "b" como tablas distintas aunque sean la misma tabla
# FROM city AS a, city AS b /// puede ser tambien
WHERE a.CountryCode=b.CountryCode; 

USE world;
SELECT code FROM country
UNION
SELECT countrycode FROM countrylanguage;

SELECT * FROM country
WHERE name LIKE '%a%';

SELECT * FROM country
WHERE lifeexpectancy IS NOT NULL
ORDER BY lifeexpectancy DESC; 

SELECT * FROM country AS co
LEFT JOIN city AS ci ON co.capital=ci.id;

SELECT TRUNCATE(MIN(LifeExpectancy)/1000, 10) AS min_life_exp, Name FROM country;
SELECT AVG(LifeExpectancy) AS average_life_exp FROM country;

SELECT Region, COUNT(*) AS countries_in_region FROM country
GROUP BY Region
ORDER BY countries_in_region DESC;

SELECT name, CountryCode, COUNT(CountryCode) FROM city
GROUP BY CountryCode, name;

# ejemplo todas la clausulas
SELECT COUNT(language), countrycode
FROM countrylanguage
WHERE IsOfficial!='T'
GROUP BY countrycode
HAVING COUNT(language)>1
ORDER BY COUNT(language) DESC;

# subqueries
SELECT DISTINCT countrycode FROM countrylanguage
WHERE language='English'
AND
countrycode IN
(SELECT countrycode FROM countrylanguage WHERE language='Spanish');


SELECT name FROM city WHERE
population > ALL
(SELECT population FROM city WHERE countrycode = 'USA');

SELECT language, countrycode FROM countrylanguage
WHERE language = ANY
(SELECT language FROM countrylanguage WHERE IsOfficial = 'T'); 

SELECT * FROM countrylanguage WHERE countrycode = 'ARG';

# seleccionar codigos de paises donde se hablan dos idiomas con subqueries -> son queries dependientes
SELECT countrycode FROM countrylanguage AS A
WHERE language = 'Spanish'
AND EXISTS (
	SELECT countrycode 
    FROM countrylanguage AS B 
    WHERE language = 'English' AND A.countrycode=B.countrycode);

SELECT c.name FROM country AS c
WHERE 
	(SELECT COUNT(cl.language) 
    FROM countrylanguage AS cl 
    WHERE c.code=cl.countrycode<2);
    
    
SELECT c.code, c.name, cl.number_of_languages
FROM country AS c
INNER JOIN
	(SELECT countrycode, COUNT(*) AS number_of_languages
    FROM countrylanguage
    GROUP BY countrycode)
AS cl
ON c.code = cl.countrycode
ORDER BY number_of_languages DESC;


# transacciones
SET AUTOCOMMIT = 0;
START TRANSACTION;
SAVEPOINT my_savepoint;
INSERT INTO countrylanguage VALUES('USA','Latin','F', 0.1);
SAVEPOINT after_latin_addition_savepoint;
INSERT INTO countrylanguage VALUES('USA','Greek', 'F',0.02);
ROLLBACK TO SAVEPOINT after_latin_addition_savepoint;
COMMIT;

#vistas
USE world;
CREATE VIEW Independent_Country_Details(country_name, country_area, country_population, country_official_language) AS
SELECT c.name, c.surfaceArea, c.population, cl.language
FROM country AS c, countrylanguage AS cl
WHERE cl.isOfficial = 'T' and cl.countrycode = c.code;

SELECT * FROM Independent_Country_Details;
DROP VIEW Independent_Country_Details;

# indices
ALTER TABLE departments ADD INDEX dept_name_idx(dept_name); -- con este nuevo indice ahora se ordena por dept_name
SHOW INDEX FROM departments;
ALTER TABLE departments DROP INDEX dept_name_idx;

# metadata
SHOW databases;
SELECT table_name, table_type
FROM INFORMATION_SCHEMA.tables
WHERE table_schema = 'world';
```