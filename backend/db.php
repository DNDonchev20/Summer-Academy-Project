<?php
class DB {
    private $db;

    function __construct() {
        $options = [
            PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
          ];
        $db_host = "bg1.pgsqlserver.com";
        $db_name = "angelxz_helloworld";
        $db_user = "angelxz_helloworld";
        $db_password = "12345678ll";

        try {
            $dsn = "pgsql:host=$db_host;port=5432;dbname=$db_name;";
            $this->db = new PDO($dsn, $db_user, $db_password, $options);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    function query($query, $params=array()) {
        $result = $this->db->prepare($query);
        $result->execute($params);
        return $result;
    }

    function fetchAssoc($result) {
        $arr = $result->fetch();
        return $arr;
    }
    
    function fetchAssocAll($result) {
        $arr = [];
        while ($row = $result->fetch()) {
            $arr[] = $row;
        }
        return $arr;
    }
}

$db = new DB();