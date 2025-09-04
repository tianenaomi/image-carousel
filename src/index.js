import './style.css';

const screenController = (function () {

    const backBtn = document.getElementById('back');
    const nextBtn = document.getElementById('next');
    const navDots = document.querySelectorAll('.navDots');
    const photoStack = document.querySelectorAll('.photo');
    let arr = [0, 1, 2, 3];
    let activeRef = 0;
    let lastRef = 3;

    window.setInterval(autoChangePhoto, 5000);

    function autoChangePhoto () {
        changePhoto();
        lastRef = activeRef;
        refHelper(arr);
    }

    function changePhoto () {
        photoStack[activeRef].classList.toggle('active');
        photoStack[lastRef].classList.toggle('active');
        navDots[activeRef].classList.toggle('active');
        navDots[lastRef].classList.toggle('active');
    }

    function refHelper (arr) {
        const value = arr[activeRef];
        activeRef = (activeRef + 1) % arr.length;
        return value;
    }

    function refHelperBack (arr) {
        const value = arr[activeRef];
        activeRef = ((activeRef - 1) + 4 ) % arr.length;
        return value;
    }

    nextBtn.addEventListener('click', () => {
        autoChangePhoto();
    });

    backBtn.addEventListener('click', () => {
        changePhoto();
        lastRef = activeRef;
        refHelperBack(arr);
    });

    (function addNavListeners () {
        for ( let i = 0; i < arr.length; i++ ) {
            navDots[i].addEventListener('click', () => {
                photoStack[lastRef].classList.toggle('active');
                navDots[lastRef].classList.toggle('active');
                activeRef = i;
                lastRef = ((activeRef - 1) + 4 ) % arr.length;
                photoStack[activeRef].classList.toggle('active'); 
                navDots[activeRef].classList.toggle('active'); 
                lastRef = activeRef;
                refHelper(arr);
            });
        };
    } ());


}());

/* ----- LEARNINGS TO TAKE AWAY -----
1. REMEMBER - % doesn't work with decimals. Whole numbers only therefore; 
    1 % 4 !== .25
    1 % 4 == 1

2. Using a loop to attach listeners to nodelists / arrays - ensure let or const is used for initialiser for block scoping. Retrieving global variable within listener body should always provide current value
*/