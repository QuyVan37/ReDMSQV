


function ProgressJS(options) {
    let data = options.data;
    generateHTML(data)
    generateCSS()
    function generateCSS() {
        let width = options.width ? options.width : '140';
        let height = options.height ? options.height : '35';
        let unprocessColor = options.unprocessColor ? options.unprocessColor : '#787878';
        let onprocessColor = options.onprocessColor ? options.onprocessColor : '#fc5a03';
        let activeColor = options.activeColor ? options.activeColor : '#09D209';
        let textColor = options.textColor ? options.textColor : '#000';
        let css = `
                                                    .progress-container {
                                                        display: flex;
                                                        gap: 10px; /* Space between chevrons */
                                                    }
                                                    .progress-item {
                                                        position: relative;
                                                    }
                                                    .progress-icon {
                                                        width: 0;
                                                        height: 0;
                                                        border-top: ${height}px solid ${unprocessColor}; 
                                                        border-right: ${width}px solid ${unprocessColor}; 
                                                        border-bottom: ${height}px solid ${unprocessColor}; 
                                                        border-left: ${height}px solid transparent; 
                                                        position: relative;
                                                    }
                                                    .progress-icon::before {
                                                        display: block;
                                                        content: '';
                                                        position: absolute;
                                                        top: -${height}px;
                                                        left:  ${width}px; 
                                                        width: 0;
                                                        height: 0;
                                                        border-top: ${height}px solid transparent ;
                                                        border-right: ${height}px solid transparent;
                                                        border-bottom: ${height}px solid transparent; 
                                                        border-left: ${height}px solid ${unprocessColor};
                                                    }
                                                    .progres-item-title {
                                                        color: ${textColor};
                                                        text-wrap: nowrap; 
                                                        position: relative;
                                                        top: -30px;
                                                        right: -5px;
                                                        font-size: medium;
                                                        font-weight: 700;
                                                        text-shadow: 1px 1px 2px pink;
                                                        z-index: 1;
                                                    }
                                                    .progres-item-pic {
                                                        color: ${textColor};
                                                        text-wrap: nowrap; 
                                                        margin: 0;
                                                        padding: 0;
                                                        position: relative;
                                                        top: -30px;
                                                        right: -5px;
                                                        font-size: 12px;
                                                        font-weight: 400;
                                                        font-style: italic;
                                                        list-style: inside circle;
                                                    }
                                                    .progress-icon.active {
                                                        border-top-color: ${activeColor};
                                                        border-right-color: ${activeColor}; /* chiều dài */
                                                        border-bottom-color: ${activeColor}; /* Chevron color */
                                                    }
                                                    .progress-icon.active::before {
                                                        border-left-color:  ${activeColor}; /* Chevron color */
                                                    }
                                                    .progress-icon.onprocess {
                                                        border-top-color: ${onprocessColor};
                                                        border-right-color: ${onprocessColor}; /* chiều dài */
                                                        border-bottom-color: ${onprocessColor}; /* Chevron color */
                                                    }
                                                    .progress-icon.onprocess::before {
                                                        border-left-color: ${onprocessColor}; /* Chevron color */
                                                    }

                                                    .progress-icon:hover {
                                                        cursor: pointer;
                                                    }
                                                    .progress-icon:hover .btn-delete {
                                                        display: block;
                                                    }
                                                    .progress-icon:hover .btn-add {
                                                        display: block;
                                                    }
                                                    .btn-delete {
                                                        display: none;
                                                        position: absolute;
                                                        top: 50%;
                                                        right: -10px;
                                                        transform: translate(50%, -50%);
                                                        background-color: red;
                                                        color: white;
                                                        border-radius: 50%;
                                                        border: none;
                                                        cursor: pointer;
                                                    }
                                                        
                                                    .btn-add {
                                                        display: none;
                                                        position: absolute;
                                                        top: 50%;
                                                        right: -${width}px;
                                                        transform: translate(-50%, -50%);
                                                        background-color: green;
                                                        color: white;
                                                        border-radius: 50%;
                                                        border: none;
                                                        cursor: pointer;
                                                    }

                                                    `;

        // Create a <style> element
        const styleElement = document.createElement('style');
        styleElement.textContent = css;

        // Select all elements with the class 'box'
        const selectorHTML = document.querySelectorAll(options.selector);

        // Loop through each element with the class 'box'
        selectorHTML.forEach(e => {
            // Remove existing <style> tags inside the box
            const styles = e.querySelectorAll('style');
            styles.forEach(style => {
                style.remove();
            });

            // Append the new <style> element
            e.appendChild(styleElement.cloneNode(true)); // Clone the <style> for each box
        });
    }
    function generateHTML(data) {
        //Show nut Create new progress
        let btnCreateNewProgress = '';
        let btnSaveChange = '';
        if (options.isEdit) {
            btnCreateNewProgress = `<button class="btn-create-new-progress" id="btn-create-new-progress">${data.length == 0 ? 'CREATE ROUTE' : 'NEXT'}</button>`;
            if (data.length > 0) {
                btnSaveChange = `<button class="btn-save-change-process" id="btn-save-change-process">SAVE</button>`;
            }
        }

        // Show các process theo data truyên vào
        let progress = "";
        data.forEach((e, index) => {
            // Show nut xóa và add khi hover
            let btnDelete = options.isEdit ? `<button title="delete this process" data-index="${index}" class="btn-delete" id="btn-delete" >X</button>` : '';
            let btnAdd = options.isEdit ? `<button title="Add more process" data-index="${index}" class="btn-add" id="btn-add">+</button>` : '';
            let routeName = e.routeName ? `<div data-index="${index}" class="progres-item-title">${e.routeName}</div>` : '';
            let pics = e?.pics?.length > 0 ? `
                <ul class="progres-item-pic">
                    ${e.pics[0]?.user_id ? `<li pic-id ='${e.pics[0].user_id}'>${e.pics[0].user_name}</li>` : ''}
                    ${e.pics[1]?.user_id ? `<li pic-id ='${e.pics[1].user_id}'>${e.pics[1].user_name}</li>` : ''}
                </ul>
            ` : '';
            progress += `
                <div class="progress-icon ${e.isActive ? 'active' : ''} ${e.isOnProcess ? 'onprocess' : ''} " data-id='${e.id}'>
                    ${routeName}
                    ${pics}
                    ${btnDelete}
                    ${btnAdd}
                </div>
            `;
        });

        // Select all elements with the specified selector
        let selectorHTML = document.querySelectorAll(options.selector);

        // Loop through the NodeList to update each element
        selectorHTML.forEach(element => {
            element.innerHTML = ''; // Clear existing content
            element.innerHTML = `
                            <div class="progress-container">
                                ${progress}
                            </div>
                                
                            ${btnCreateNewProgress}
                            ${btnSaveChange}
                           
                        `; // Add the generated HTML

            // Add event listener for save change button

            const saveChangeButton = element.querySelector('#btn-save-change-process');
            if (saveChangeButton) {
                saveChangeButton.addEventListener('click', () => {
                    if (typeof options.onSaveChange === 'function') {
                        options.onSaveChange(data); // Call the onSaveChange callback with the current data
                    }
                });
            }
        });
    }

    // Add event listener for delete button
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            let index = parseInt(e.target.getAttribute('data-index'));
            // delete item in data
            data.splice(index, 1);
            // re-render progress bar
            generateHTML(data);
            generateCSS();
        }
    });
    // Add event listener for add button
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add') || e.target.classList.contains('btn-create-new-progress')) {
            let currentIndex = parseInt(e.target.getAttribute('data-index'));
            createContainer(currentIndex)


        }
    });





    function createContainer(currentIndex) {
        // lấy current width của thẻ select
        let selectorHTML = document.querySelectorAll(options.selector);
        let width = 240;

        // Create a container for search options
        document.querySelectorAll('.create_progress_option_container').forEach(el => el.remove());

        let container = document.createElement('div');
        container.className = 'create_progress_option_container overflow-y-auto';
        container.style.cssText = `
            max-width: 350px;
            min-width: 250px;
            height: 250px;
            max-height: 250px;
            background: #fff;
            z-index: 100;
            border-radius: 5px;
            padding: 5px 20px;
            overflow-y: auto;
            position: relative;
            box-shadow: 5px 5px 20px;
            color: #000;
            top: 100px;
            left: 50%;
            transform: translate(-50%, -50%);
        `;

        // Add confirm and close buttons
        let btnConfirm = document.createElement('button');
        btnConfirm.textContent = 'Confirm';

        btnConfirm.addEventListener('click', () => {
            let selectedRouteID = document.querySelector('.create_progress_option_container select').value;
            let selectedRoute = options.progressOptionData.find(e => e.route.routeID === parseInt(selectedRouteID));

            if (selectedRoute) {
                // Get selected PICs
                let selectedPics = Array.from(document.querySelectorAll('.pics-container input[type="checkbox"]:checked')).map(checkbox => {
                    return selectedRoute.pics.find(pic => pic.user_id === parseInt(checkbox.value));
                });

                // Add new route to data

                currentIndex = currentIndex === undefined || isNaN(currentIndex) ? data.length - 1 : parseInt(currentIndex);

                data.splice(currentIndex + 1, 0, {
                    routeID: selectedRoute.route.routeID,
                    routeName: selectedRoute.route.routeName,
                    isActive: false,
                    isOnProcess: false,
                    pics: selectedPics
                });      // Re-render HTML and CSS
                generateHTML(data);
                generateCSS();

                // Remove the container
                document.querySelectorAll('.create_progress_option_container').forEach(el => el.remove());
            }
        }); btnConfirm.style.cssText = `
            padding: 5px 10px;
            background-color: green;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 5px;
        `;

        let btnClose = document.createElement('button');
        btnClose.textContent = 'Close';
        btnClose.style.cssText = `
            padding: 5px 10px;
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 5px;
        `;

        // Add event listener to close button
        btnClose.addEventListener('click', () => {
            container.remove();
        });

        // Add a container for buttons to align them properly
        let buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 10px;
        `;

        // Append buttons to the button container
        buttonContainer.appendChild(btnClose);
        buttonContainer.appendChild(btnConfirm);

        // Append the button container to the main container
        container.appendChild(buttonContainer);
        selectorHTML.forEach(el => {
            el.parentElement.style.position = 'relative';
            el.parentElement.appendChild(container);
        });

        createOptionProcess();
    }


    // Append the container to the parent of the selector


    function createOptionProcess() {
        let listOption = `<option value="">Select Next Route</option>`; // Add an empty option with a placeholder text
        listOption += options.progressOptionData
            .filter(e => !data.some(d => d.routeID === e.route.routeID)) // Filter out options already in data
            .map(e => {
                return `<option value="${e.route.routeID}">${e.route.routeName}</option>`;
            })
            .join(''); // Generate options HTML

        let selectElement = document.createElement('select');
        selectElement.className = '';
        selectElement.style.cssText = `
                width: 100%;
                height: 35px;
                border-radius: 5px;
                border: 1px solid #ccc;
                padding: 5px;
                background-color: #fff;
                color: #000;
            `;
        selectElement.innerHTML = listOption;

        // Append the select element to the container
        document.querySelectorAll('.create_progress_option_container').forEach(container => {
            container.appendChild(selectElement);
        });

        // Create a container for displaying pics with checkboxes
        let picsContainer = document.createElement('div');
        picsContainer.className = 'pics-container';
        picsContainer.style.cssText = `
            margin-top: 10px;
            max-height: 150px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
            background-color: #f9f9f9;
        `;

        // Add a search input for filtering pics
        let searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.classList = 'search_pics_input';
        searchInput.placeholder = 'Search PICs...';
        searchInput.style.cssText = `
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        `;

        // Append search input to the pics container


        let picsContainer_searchBOX = document.createElement('div');
        picsContainer_searchBOX.className = 'pics-container-searchBOX';
        let picsContainer_RenderPIC = document.createElement('div');
        picsContainer_RenderPIC.className = 'pics-container-renderPIC';
        picsContainer_searchBOX.appendChild(searchInput);
        picsContainer.appendChild(picsContainer_searchBOX);
        picsContainer.appendChild(picsContainer_RenderPIC);
        // Function to render pics based on search
        function renderPics(pics) {

            let picsHTML = pics
                .map(pic => {
                    return `
                        <div style="display: flex; align-items: center; margin-bottom: 5px;">
                            <input type="checkbox" id="pic-${pic.user_id}" value="${pic.user_id}" style="margin-right: 10px;">
                            <label for="pic-${pic.user_id}">[${pic.dept_name}-${pic.grade_name}]${pic.user_name}</label>
                        </div>
                    `;
                })
                .join('');
            picsContainer_RenderPIC.innerHTML = ''; // Clear existing content
            picsContainer_RenderPIC.innerHTML = picsHTML; // Add the filtered pics
        }

        // Listen for changes in the select element to display corresponding pics
        selectElement.addEventListener('change', () => {
            let selectedRouteID = selectElement.value;
            let selectedRoute = options.progressOptionData.find(e => e.route.routeID === parseInt(selectedRouteID));
            if (selectedRoute && selectedRoute.pics) {
                renderPics(selectedRoute.pics);
            } else {
                picsContainer.innerHTML = ''; // Clear pics if no route is selected
                picsContainer.appendChild(searchInput); // Re-add the search input
            }

        });

        // Add search functionality using event delegation
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('search_pics_input')) {
                let searchValue = e.target.value.toLowerCase();
                let selectedRouteID = selectElement.value;

                let selectedRoute = options.progressOptionData.find(e => e.route.routeID === parseInt(selectedRouteID));
                if (selectedRoute && selectedRoute.pics) {
                    let filteredPics = selectedRoute.pics.filter(pic =>
                        (`[${pic.dept_name}-${pic.grade_name}]${pic.user_name}`).toLowerCase().includes(searchValue)
                    );
                    renderPics(filteredPics);
                }
            }
        });

        // Append the pics container to the main container
        document.querySelectorAll('.create_progress_option_container').forEach(container => {
            container.appendChild(picsContainer);
        });
    }


}


ProgressJS({
    selector: ".process",
    textColor: "",
    activeColor: "",
    onprocessColor: "",
    unprocessColor: "",
    width: 180,
    height: 30,
    isEdit: true,
    progressOptionData: [
        
            {
                "route": {
                    "routeID": 1,
                    "routeName": "W-Meeting"
                },
                "pics": [
                    {
                        "user_id": 6,
                        "user_name": "Hoang Van Thanh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 11,
                        "user_name": "Nguyen Khac Phong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 13,
                        "user_name": "Luong Tien Dat",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8127,
                        "user_name": "Han Tuan Nghia",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8169,
                        "user_name": "Hoang Ngoc Minh",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8170,
                        "user_name": "Nham Tan Dat",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8171,
                        "user_name": "Bui Viet Cuong",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8172,
                        "user_name": "Nguyen Hoang Tung",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8173,
                        "user_name": "Tran Khac Quan",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8219,
                        "user_name": "Luong Thanh Loi",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8227,
                        "user_name": "Nguyen Thi Khanh Linh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8234,
                        "user_name": "Vo Ngan Thao",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8236,
                        "user_name": "RPA",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8239,
                        "user_name": "Trinh Viet Hoang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8246,
                        "user_name": "Bui Duc Chien",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8247,
                        "user_name": "Nguyen Tien Dung",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8248,
                        "user_name": "Nguyen Van Thai",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8249,
                        "user_name": "Ngo Van Tan",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8255,
                        "user_name": "Tong Thi Linh ",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8257,
                        "user_name": "Nguyen Minh Duong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8294,
                        "user_name": "Vu Minh Quang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 1,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 2,
                    "routeName": "PAE-G4UP-Check"
                },
                "pics": [
                    {
                        "user_id": 6,
                        "user_name": "Hoang Van Thanh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 13,
                        "user_name": "Luong Tien Dat",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8127,
                        "user_name": "Han Tuan Nghia",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8169,
                        "user_name": "Hoang Ngoc Minh",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8171,
                        "user_name": "Bui Viet Cuong",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8172,
                        "user_name": "Nguyen Hoang Tung",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8173,
                        "user_name": "Tran Khac Quan",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 1,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 3,
                    "routeName": "DMT-G6Up-Approve"
                },
                "pics": [
                    {
                        "user_id": 18,
                        "user_name": "Takahashi Hiroki",
                        "dept_name": "DMT",
                        "factory": "QV",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 6109,
                        "user_name": "Luu Van Quy",
                        "dept_name": "DMT",
                        "factory": "QV",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8126,
                        "user_name": "Tomoya Ikeuchi",
                        "dept_name": "DMT",
                        "factory": "QV",
                        "grade_name": "G6"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 12,
                    "routeName": "PE1-PIC-Check"
                },
                "pics": [
                    {
                        "user_id": 6112,
                        "user_name": "Nguyen Huu Bien",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 7120,
                        "user_name": "Ngo Tien Thanh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7122,
                        "user_name": "Trieu Tien Dung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7127,
                        "user_name": "Nguyen Van Viet",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7130,
                        "user_name": "Vu Thanh Son",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 7131,
                        "user_name": "Luu Thi My",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8138,
                        "user_name": "Le Quang Thuong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8153,
                        "user_name": "Hoang Thanh Tung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8154,
                        "user_name": "Le Thi Tham",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8157,
                        "user_name": "Le Van Truong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8159,
                        "user_name": "Nguyen Van Do",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8160,
                        "user_name": "Pham Khac Phi",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8161,
                        "user_name": "Nguyen Van Vuong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8164,
                        "user_name": "Hiroaki Motooka",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8165,
                        "user_name": "Ngo Van Son",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8168,
                        "user_name": "Nguyen Xuan Long",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8181,
                        "user_name": "Nguyen Van Diem",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8182,
                        "user_name": "Nguyen Hai Dang",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8183,
                        "user_name": "Ta Van Phong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8199,
                        "user_name": "Nguyen Gia Quoc",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8204,
                        "user_name": "Bui Cong Huy",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8207,
                        "user_name": "Naoki Uchiyama",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 8213,
                        "user_name": "Nguyen Thanh Long",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8214,
                        "user_name": "Nguyen Tien Dung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8215,
                        "user_name": "Nguyen Thi Quyen",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8222,
                        "user_name": "Trinh Van Bao",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8224,
                        "user_name": "Tran Khac Thinh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8225,
                        "user_name": "Pham Van Truong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8226,
                        "user_name": "Nguyen Duc Khanh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8233,
                        "user_name": "Nguyen Van Cong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8235,
                        "user_name": "Nguyen Van Chuc",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8240,
                        "user_name": "Trinh Xuan Hung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8243,
                        "user_name": "Hoang Huu Hung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8258,
                        "user_name": "Nguyen Hoang Anh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8259,
                        "user_name": "HOANG DINH TAN",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8260,
                        "user_name": "Nguyen Chi Thanh",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8283,
                        "user_name": "Ha Hoc Tu",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8286,
                        "user_name": "Nguyen Huy Toan",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 4,
                    "routeName": "PE1-G4UPCheck"
                },
                "pics": [
                    {
                        "user_id": 6112,
                        "user_name": "Nguyen Huu Bien",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 7120,
                        "user_name": "Ngo Tien Thanh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7122,
                        "user_name": "Trieu Tien Dung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7127,
                        "user_name": "Nguyen Van Viet",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7130,
                        "user_name": "Vu Thanh Son",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 7131,
                        "user_name": "Luu Thi My",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8138,
                        "user_name": "Le Quang Thuong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8154,
                        "user_name": "Le Thi Tham",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8157,
                        "user_name": "Le Van Truong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8161,
                        "user_name": "Nguyen Van Vuong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8204,
                        "user_name": "Bui Cong Huy",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8207,
                        "user_name": "Naoki Uchiyama",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G6"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 5,
                    "routeName": "JP-PAE-Check"
                },
                "pics": [
                    {
                        "user_id": 6,
                        "user_name": "Hoang Van Thanh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 11,
                        "user_name": "Nguyen Khac Phong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 13,
                        "user_name": "Luong Tien Dat",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8127,
                        "user_name": "Han Tuan Nghia",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8169,
                        "user_name": "Hoang Ngoc Minh",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8170,
                        "user_name": "Nham Tan Dat",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8171,
                        "user_name": "Bui Viet Cuong",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8172,
                        "user_name": "Nguyen Hoang Tung",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8173,
                        "user_name": "Tran Khac Quan",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8219,
                        "user_name": "Luong Thanh Loi",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8227,
                        "user_name": "Nguyen Thi Khanh Linh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8234,
                        "user_name": "Vo Ngan Thao",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8236,
                        "user_name": "RPA",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8239,
                        "user_name": "Trinh Viet Hoang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8246,
                        "user_name": "Bui Duc Chien",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8247,
                        "user_name": "Nguyen Tien Dung",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8248,
                        "user_name": "Nguyen Van Thai",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8249,
                        "user_name": "Ngo Van Tan",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8255,
                        "user_name": "Tong Thi Linh ",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8257,
                        "user_name": "Nguyen Minh Duong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8294,
                        "user_name": "Vu Minh Quang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 1,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 6,
                    "routeName": "JP-PE1-Check"
                },
                "pics": [
                    {
                        "user_id": 6,
                        "user_name": "Hoang Van Thanh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 11,
                        "user_name": "Nguyen Khac Phong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 13,
                        "user_name": "Luong Tien Dat",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8127,
                        "user_name": "Han Tuan Nghia",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8169,
                        "user_name": "Hoang Ngoc Minh",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8170,
                        "user_name": "Nham Tan Dat",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8171,
                        "user_name": "Bui Viet Cuong",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8172,
                        "user_name": "Nguyen Hoang Tung",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8173,
                        "user_name": "Tran Khac Quan",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8219,
                        "user_name": "Luong Thanh Loi",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8227,
                        "user_name": "Nguyen Thi Khanh Linh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8234,
                        "user_name": "Vo Ngan Thao",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8236,
                        "user_name": "RPA",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8239,
                        "user_name": "Trinh Viet Hoang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8246,
                        "user_name": "Bui Duc Chien",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8247,
                        "user_name": "Nguyen Tien Dung",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8248,
                        "user_name": "Nguyen Van Thai",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8249,
                        "user_name": "Ngo Van Tan",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8255,
                        "user_name": "Tong Thi Linh ",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8257,
                        "user_name": "Nguyen Minh Duong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8294,
                        "user_name": "Vu Minh Quang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 1,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 7,
                    "routeName": "PE1-G6Up-Approve"
                },
                "pics": [
                    {
                        "user_id": 2027,
                        "user_name": "PE1Check",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 4089,
                        "user_name": "Le Huu The",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 6118,
                        "user_name": "Le Hung Cuong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8147,
                        "user_name": "Bui Thi Ly",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 8162,
                        "user_name": "Nguyen Van Long",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8163,
                        "user_name": "Nguyen Van Quyen",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 8218,
                        "user_name": "Shuei Hashimoto",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8299,
                        "user_name": "Kiyomitsu Koda",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "GM"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 8,
                    "routeName": "PAE-G6Up-Approve"
                },
                "pics": [
                    {
                        "user_id": 2,
                        "user_name": "Do Van Hung",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 3,
                        "user_name": "La Thi Dung",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 8290,
                        "user_name": "Wada Haruki",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "M1"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 13,
                    "routeName": "W-ISSUE-ECN"
                },
                "pics": [
                    {
                        "user_id": 6,
                        "user_name": "Hoang Van Thanh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 11,
                        "user_name": "Nguyen Khac Phong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 13,
                        "user_name": "Luong Tien Dat",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 6112,
                        "user_name": "Nguyen Huu Bien",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 7120,
                        "user_name": "Ngo Tien Thanh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7122,
                        "user_name": "Trieu Tien Dung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7127,
                        "user_name": "Nguyen Van Viet",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 7130,
                        "user_name": "Vu Thanh Son",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 7131,
                        "user_name": "Luu Thi My",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8127,
                        "user_name": "Han Tuan Nghia",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8138,
                        "user_name": "Le Quang Thuong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8153,
                        "user_name": "Hoang Thanh Tung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8154,
                        "user_name": "Le Thi Tham",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8157,
                        "user_name": "Le Van Truong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G5"
                    },
                    {
                        "user_id": 8159,
                        "user_name": "Nguyen Van Do",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8160,
                        "user_name": "Pham Khac Phi",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8161,
                        "user_name": "Nguyen Van Vuong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8164,
                        "user_name": "Hiroaki Motooka",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8165,
                        "user_name": "Ngo Van Son",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8168,
                        "user_name": "Nguyen Xuan Long",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8169,
                        "user_name": "Hoang Ngoc Minh",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "M1"
                    },
                    {
                        "user_id": 8170,
                        "user_name": "Nham Tan Dat",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8171,
                        "user_name": "Bui Viet Cuong",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8172,
                        "user_name": "Nguyen Hoang Tung",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8173,
                        "user_name": "Tran Khac Quan",
                        "dept_name": "PAE",
                        "factory": "TS",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8181,
                        "user_name": "Nguyen Van Diem",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8182,
                        "user_name": "Nguyen Hai Dang",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8183,
                        "user_name": "Ta Van Phong",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8199,
                        "user_name": "Nguyen Gia Quoc",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8204,
                        "user_name": "Bui Cong Huy",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G4"
                    },
                    {
                        "user_id": 8207,
                        "user_name": "Naoki Uchiyama",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G6"
                    },
                    {
                        "user_id": 8213,
                        "user_name": "Nguyen Thanh Long",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8214,
                        "user_name": "Nguyen Tien Dung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8215,
                        "user_name": "Nguyen Thi Quyen",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8219,
                        "user_name": "Luong Thanh Loi",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8222,
                        "user_name": "Trinh Van Bao",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8224,
                        "user_name": "Tran Khac Thinh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8225,
                        "user_name": "Pham Van Truong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8226,
                        "user_name": "Nguyen Duc Khanh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8227,
                        "user_name": "Nguyen Thi Khanh Linh",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8233,
                        "user_name": "Nguyen Van Cong",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8234,
                        "user_name": "Vo Ngan Thao",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8235,
                        "user_name": "Nguyen Van Chuc",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8236,
                        "user_name": "RPA",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8239,
                        "user_name": "Trinh Viet Hoang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8240,
                        "user_name": "Trinh Xuan Hung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8243,
                        "user_name": "Hoang Huu Hung",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8246,
                        "user_name": "Bui Duc Chien",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8247,
                        "user_name": "Nguyen Tien Dung",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8248,
                        "user_name": "Nguyen Van Thai",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8249,
                        "user_name": "Ngo Van Tan",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8255,
                        "user_name": "Tong Thi Linh ",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8257,
                        "user_name": "Nguyen Minh Duong",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8258,
                        "user_name": "Nguyen Hoang Anh",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8259,
                        "user_name": "HOANG DINH TAN",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8260,
                        "user_name": "Nguyen Chi Thanh",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8283,
                        "user_name": "Ha Hoc Tu",
                        "dept_name": "PE1",
                        "factory": "TS",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8286,
                        "user_name": "Nguyen Huy Toan",
                        "dept_name": "PE1",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 8294,
                        "user_name": "Vu Minh Quang",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G3"
                    },
                    {
                        "user_id": 1,
                        "user_name": "Nguyen Van Quy",
                        "dept_name": "PAE",
                        "factory": "QV",
                        "grade_name": "G4"
                    }
                ]
            },
            {
                "route": {
                    "routeID": 9,
                    "routeName": "Finished"
                },
                "pics": []
            }
       
    ],
    data: [
        // Your existing data here
    ],
    onSaveChange: function (data) {
        console.log(data);  
    }
});


  public JsonResult api_getRouteAndPIC(int? DFMID)
  {

      List<object> output = new List<object>();
      if (DFMID == null)
      {

          string sqlGetRoute = $"SELECT * FROM dsum_status_category WHERE route_name is not null  ORDER BY order_view";
          var routes = db.ExcuteQueryAndGetData(sqlGetRoute).data;
          foreach (var item in routes)
          {
              var SQLGetPICs = $"SELECT u.user_id, u.user_name, department.dept_name, department.factory, g.grade_name from userrole  " +
                               $"inner Join users u on u.user_id = userrole.user_id  " +
                               $"inner Join department On userrole.dept_id = department.dept_id  " +
                               $"inner Join gradecategory g ON g.grade_id = u.grade_id   " +
                               $"WHERE u.is_active = true and dsum_role_id = '{item["dsum_role_id_res"]}' and  department.dept_name = ANY (string_to_array('{item["dept_res"]}', ',')) AND u.grade_id >= '{item["grade_id_res"]}'::int";
              var pic = db.ExcuteQueryAndGetData(SQLGetPICs).data;
              output.Add(new
              {
                  route = new
                  {
                      RouteID = item["dsum_status_id"],
                      RouteName = item["route_name"],

                  },
                  pics = pic
              });
          }
      }
      else
      {
          var dsum = db.ExcuteQueryAndGetData($"SELECT * FROM dsum WHERE dfm_id = '{DFMID}'").data[0];

          string[] routeIDstring = dsum["route"].ToString().Split(',');
          foreach (var id in routeIDstring)
          {
              List<object> listUser = new List<object>();
              var item = db.ExcuteQueryAndGetData($"SELECT * FROM dsum_status_category WHERE dsum_status_id = '{id}' ").data[0];
              var listPIC_IdString = db.ExcuteQueryAndGetData($"SELECT list_pic_userid FROM  dsum_pic WHERE dfm_id = '{dsum["dfm_id"]}' AND process_id = '{id}'").data[0]["list_pic_userid"].ToString();
              string[] listPICUserIDstring = listPIC_IdString.Split(',');
              foreach (var userID in listPICUserIDstring)
              {
                  if (!String.IsNullOrWhiteSpace(userID))
                  {
                      var user = db.ExcuteQueryAndGetData($"SELECT user_id, user_name FROM users WHERE user_id = '{userID}'").data[0];
                      listUser.Add(user);
                  }

              }

              output.Add(new
              {
                  route = new
                  {
                      RouteID = item["dsum_status_id"],
                      RouteName = item["route_name"],
                  },
                  pics = listUser
              });
          }









      }

      return Json(output);

  }























