document.getElementById("search-book-heading2").style.display = "none";
document.getElementById("loading").style.display = "none";
document.getElementById("not-found").style.display = "none";

function searchResult() {
    document.getElementById("search-book-heading2").style.display = "none";
    document.getElementById("not-found").style.display = "none";
    document.getElementById("book-container").innerHTML = '';
    let searchValue = document.getElementById("search-box").value;
    searchValue = searchValue.replaceAll(" ", "+");
    console.log(searchValue);
    // document.getElementById("search-box").value = '';
    if (searchValue == '') {
        document.getElementById("search-book-heading").style.display = "block";
    }
    else {
        document.getElementById("loading").style.display = "block";
        document.getElementById("search-book-heading").style.display = "none";

        fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
            .then(res => res.json())
            .then(data => displayBook(data.docs))
    }
}

function displayBook(data) {
    document.getElementById("loading").style.display = "none";
    if (data.length == 0) {
        document.getElementById("not-found").style.display = "block";
    }
    else {
        document.getElementById("search-book-heading2").style.display = "block";
        data.forEach(singleBook => {
            const { title, author_name, publish_date, cover_i, author_key } =
                singleBook;
            const bookContainer = document.getElementById("book-container");
            const div = document.createElement("div");
            div.innerHTML =
                `
                <div class="card lg:card-side bg-base-100 shadow-xl">
                    <figure><img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="Album" /></figure>
                    <div class="card-body">
                    <h5 class="card-title">Book Title: ${title ? title : ""}</h5>
                    <p class="card-text">Author: ${author_name[0]}</p>
                    <p class="card-text">Publish date: ${publish_date[0]}</p>
                        <div class="card-actions justify-end">
                           
                
                <label for="my-modal" class="btn"  onclick="loadAuthorDetail('${author_key[0]
                }')" >author detail</label>
                        </div>
                    </div>
                </div>

      `;
            bookContainer.appendChild(div);
        });
    }
}

const loadAuthorDetail = (authId) => {
    console.log(authId);
    fetch(`https://openlibrary.org/authors/${authId}.json`)
        .then((res) => res.json())
        .then((data) => displayAuthorDetail(data,authId));
};

const displayAuthorDetail = (author,authId) => {
    window.scrollTo(0, 40);
    const { name, birth_date, bio } = author;
    const detailContainer = document.getElementById("author-detail");
    detailContainer.innerHTML = `
    <figure><img src="https://covers.openlibrary.org/a/olid/${authId}-S.jpg" alt="Album" /></figure>
    <h5 class="font-bold text-lg">Author Name: ${name}</h5>
    <p class="py-4">Author DOB: ${birth_date ? birth_date : "N/a"}</p>
    <p class="py-4">Author Bio: ${bio ? bio : "N/a"}</p>

    
       
       `;
};

