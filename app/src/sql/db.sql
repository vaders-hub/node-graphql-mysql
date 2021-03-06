CREATE TABLE IF NOT EXISTS mybbs (
    bbs_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS mymembers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(20) NOT NULL UNIQUE,
    member_pw VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    token_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP 
) ENGINE=INNODB;

// * apollo client
// queryBBS {
//   data {
//     title
//     body
//   }
// }