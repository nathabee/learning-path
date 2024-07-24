 
let DEBUG = false;
const NBMAXDEBUG = 100;
let nbDebug = 0;
var db = null; // Global variable to hold the database reference

function logMessage(message) {
    if (DEBUG) {
    //    console.log(message);
        nbDebug++;
        if (nbDebug > NBMAXDEBUG) {
            DEBUG = false;
        }
    }
}

 

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    logMessage('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');

    // Initialize the database
    initDatabase();

    // Initialize game controls
    initializeGameControls();
}

function initDatabase() {
    if (!db) {
        db = window.sqlitePlugin.openDatabase({ name: 'mygame.db', location: 'default' });

        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS scores (id integer primary key, name text, score integer)');
        }, function(error) {
            logMessage('Transaction ERROR: ' + error.message);
        }, function() {
            logMessage('Database initialized');
            // Fetch and update highest score once the database is initialized
            getHighestScore(function(highestScore) {
                document.getElementById('highestscore').textContent = 'Highest Score: ' + highestScore;
            });
        });
    }
}

// Check and reinitialize database connection if needed
function checkDatabaseConnection() {
    if (!db) {
        initDatabase();
    }
}


function initializeGameControls() {
    if (cordova.platformId === 'browser') {
        document.body.classList.add('browser');
        initializeBrowserControls();
    } else if (cordova.platformId === 'android') {
        document.body.classList.add('android');
        initializeAndroidControls();
    }
}

function initializeBrowserControls() {
    document.getElementById('control-up').addEventListener('click', function() {
        moveBee('up');
    });
    document.getElementById('control-left').addEventListener('click', function() {
        moveBee('left');
    });
    document.getElementById('control-right').addEventListener('click', function() {
        moveBee('right');
    });
    document.getElementById('control-down').addEventListener('click', function() {
        moveBee('down');
    });

    //initializeTouchControls(); // If you also want touch controls on the browser
}

function initializeAndroidControls() {
    initializeTouchControls();
    initializeJoystickControls();
}

 

function initializeTouchControls() {
    // Implement touch controls initialization logic here
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;
    let yDown = null;

    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                moveBee('left');
            } else {
                moveBee('right');
            }
        } else {
            if (yDiff > 0) {
                moveBee('up');
            } else {
                moveBee('down');
            }
        }

        xDown = null;
        yDown = null;
    }
}

function initializeJoystickControls() {
    // Implement joystick controls initialization logic here
    const joystick = new VirtualJoystick({
        container: document.getElementById('joystickContainer'),
        mouseSupport: true,
    });

    joystick.addEventListener('touchMove', function(event) {
        const { x, y } = event.position;

        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) {
                moveBee('right');
            } else {
                moveBee('left');
            }
        } else {
            if (y > 0) {
                moveBee('down');
            } else {
                moveBee('up');
            }
        }
    });
}
