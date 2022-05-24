INSERT INTO department (name)
VALUES  ('Marketing'),
        ('Operations'),
        ('Finance'),
        ('Sales'),
        ('HR'),
        ('Purchase');

INSERT INTO role (title, salary, department_id)
VALUES  ('S.M. Expert', 1300, 1),
        ('S.E. Optimazer', 1450, 1),
        ('Manager of Goods', 2000, 2),
        ('Manager of Services', 2300, 2),
        ('Score Keeper', 3000, 3),
        ('Sales Director', 3200, 4),
        ('sales Manager', 2500, 4),
        ('Sales Coach', 2400, 4),
        ('Talent Manager', 1900, 5),
        ('Workplace Safety', 1600, 5),
        ('Monitor', 3200, 6);

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES  ('Mark', 'Jackson', 5, 'Carlos M.'),
        ('Ron', 'Lopez', 3, ''),
        ('Luis', 'Enriquez', 1, 'Maria L.'),
        ('Juan', 'Rodr', 6, '');