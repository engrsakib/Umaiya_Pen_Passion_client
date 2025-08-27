# Lab Final Exam Guide - MySQL Workbench (SQL)

এই README-তে Lab Final Exam-এর জন্য MySQL Workbench-এ SQL কোড উদাহরণসহ প্রতিটি টপিক আলাদাভাবে দেওয়া হলো।  
প্রতিটি পার্ট-এর নিচে কমন SQL কোড দেওয়া হয়েছে, exam-এ কপি-পেস্ট করে সরাসরি ব্যবহার করতে পারবে।

---

## 1. Table Creation

```sql
-- Students table creation
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  age INT,
  department VARCHAR(50)
);

-- Departments table creation
CREATE TABLE departments (
  dept_id INT PRIMARY KEY AUTO_INCREMENT,
  dept_name VARCHAR(50)
);
```

---

## 2. Value Insertion, Deletion, Update

```sql
-- Insertion
INSERT INTO students (name, age, department) VALUES ('Rahim', 22, 'CSE');
INSERT INTO students (name, age, department) VALUES ('Karim', 21, 'EEE');

-- Update
UPDATE students SET age = 23 WHERE name = 'Rahim';

-- Deletion
DELETE FROM students WHERE name = 'Karim';
```

---

## 3. Aggregate Functions (COUNT, SUM, AVG, MAX, MIN)

```sql
-- Total students
SELECT COUNT(*) FROM students;

-- Age sum
SELECT SUM(age) FROM students;

-- Average age
SELECT AVG(age) FROM students;

-- Maximum age
SELECT MAX(age) FROM students;

-- Minimum age
SELECT MIN(age) FROM students;
```

---

## 4. Wild Cards (LIKE, % and _)

```sql
-- Name starts with 'R'
SELECT * FROM students WHERE name LIKE 'R%';

-- Name ends with 'm'
SELECT * FROM students WHERE name LIKE '%m';

-- Name has 'a' as second letter
SELECT * FROM students WHERE name LIKE '_a%';
```

---

## 5. Joins

```sql
-- Inner Join: students with their department name
SELECT students.name, students.age, departments.dept_name
FROM students
INNER JOIN departments ON students.department = departments.dept_name;

-- Left Join: all students, even if no department found
SELECT students.name, students.age, departments.dept_name
FROM students
LEFT JOIN departments ON students.department = departments.dept_name;
```

---

## 6. Group By

```sql
-- Count students in each department
SELECT department, COUNT(*) AS total_students
FROM students
GROUP BY department;

-- Average age per department
SELECT department, AVG(age) AS avg_age
FROM students
GROUP BY department;
```

---

## 7. Order By

```sql
-- Order students by age ascending
SELECT * FROM students ORDER BY age ASC;

-- Order students by name descending
SELECT * FROM students ORDER BY name DESC;
```

---

**কপি-পেস্ট করলেই MySQL Workbench-এ কাজ করবে!  
শুভ কামনা।**