## For save DB from local server, use script `makeDump.sh`:
***
Dumping settings, DB name, credentials etc specifed in script `makeDump.sh`, change it if you need.  
Dump of local DB will be placed in `./dumps` folder.  
In terminal, go to `dbinit` folder and run:  
> dbinit % `sh makeDump.sh`
***
<br/>

## Creating empty DB for data uploading:
##### All samples mind that you have existion `root:1111` admin user in `mysql` and work with base named `dev_database_1` and will use user `dev_sql_usr:111` as site connection.
***
Connect to mySQL using terminal on local machine, or using SSH tunel if you want create DB on remote host:  
> \# `mysql -u root -p`
<br/>

On succes - run command for empty DB creation:  
> mysql> `create database dev_database_1;`  

Check succes (look for our DB in list):  
> mysql> `show databases;`  

Add user `dev_sql_usr` with pass `111`:  
> mysql> `CREATE USER 'dev_sql_usr'@'localhost' IDENTIFIED BY '111';`  

Add user privileges, that accepted him access to new DB:  
> mysql> `GRANT ALL PRIVILEGES ON dev_database_1.* TO 'dev_sql_usr'@'localhost';`  

> mysql> `FLUSH PRIVILEGES;`  

Check user creation result:  
> mysql> `SHOW GRANTS FOR 'dev_sql_usr'@'localhost';`  
***
<br/>


## Upload dump data to existing DB:
***
By default, dump contains `DROP TABLE` section and will easy override existing tables, if it exists.  
If you want to use clean and existing DB (for save users etc), remove all existing tables using command (this is a shell command, not working in `mysql>` scope):  
> \# `mysql -h'127.0.0.1' -u'root' -p'root' -BNe "show tables" dev_database_1 | tr '\n' ',' | sed -e 's/,$//' | awk '{print "SET FOREIGN_KEY_CHECKS = 0;DROP TABLE IF EXISTS " $1 ";SET FOREIGN_KEY_CHECKS = 1;"}' | mysql -u'root' -p'root' dev_database_1`
***
<br/>

## Upload dump data to empty DB:
***
Copy needly dump from `./dumps/` to `../dbinit` (above this manual).  
For upload dump file to DB, run this script from `dbinit` folder  
Direct for local machine:  
> % `mysql -u'root' -p'1111' "dev_database_1" < "dump.sql"`  

Or using SSH for remote host, using port forvarting:  
Attach remote port:3306 to local port:3333 (or another what you need)
> % `ssh -f -N -L 3333:localhost:3306 root@remote.host.com -p 2227`  

Connect to `mysql` on forvated port and execute dump file over target DB:
> % `mysql -h'127.0.0.1' -P'3333' -u'dev_sql_usr' -p'111' 'dev_database_1' < ./dump.sql`
***
<br/>

## For remote installing (using PHP uploader)
***
Define credentials and settings in `index.php`.
Copy `index.php` and `dump.sql` to site root directory.
Go to site using browser, call to home page with parametrs:
> https://hostname.com`?install=1`  

Check errors in server responce, if no errors - instalation is done.
***
