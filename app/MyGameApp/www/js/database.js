
// Add a new score entry
function addScore(name, score) {
    checkDatabaseConnection();
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO scores (name, score) VALUES (?, ?)', [name, score], function(tx, res) {
            logMessage('Data added successfully');
        }, function(tx, error) {
            logMessage('Insert ERROR: ' + error.message);
        });
    });
}

// Get the highest score
function getHighestScore(callback) {
    checkDatabaseConnection();
    db.transaction(function(tx) {
        tx.executeSql('SELECT MAX(score) AS maxScore FROM scores', [], function(tx, resultSet) {
            if (resultSet.rows.length > 0 && resultSet.rows.item(0).maxScore !== null) {
                var highestScore = resultSet.rows.item(0).maxScore;
                callback(highestScore);
            } else {
                callback(0); // Return 0 if no rows are found
            }
        }, function(tx, error) {
            logMessage('Select ERROR: ' + error.message);
            callback(0); // Return 0 in case of an error
        });
    });
}

// Update an existing score
function updateScore(id, newScore) {
    checkDatabaseConnection();
    db.transaction(function(tx) {
        tx.executeSql('UPDATE scores SET score = ? WHERE id = ?', [newScore, id], function(tx, res) {
            logMessage('Data updated successfully');
        }, function(tx, error) {
            logMessage('Update ERROR: ' + error.message);
        });
    });
}

// Delete a score entry
function deleteScore(id) {
    checkDatabaseConnection();
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM scores WHERE id = ?', [id], function(tx, res) {
            logMessage('Data deleted successfully');
        }, function(tx, error) {
            logMessage('Delete ERROR: ' + error.message);
        });
    });
}


