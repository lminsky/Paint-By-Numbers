*Paint by Numbers*

**Get Size**
----
  Fetches the width and height of the grid.

* **URL**

  /size/

* **Method:**

  `GET`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `100`
 
* **Sample Call:**

  curl http://pbn.minsky.co/size


**Get Colors**
----
  Fetches the color of each square in the grid.

* **URL**

  /colors/

* **Method:**

  `GET`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "squares": ["abcdef","abcdef","abcdef","abcdef","abcdef"] }`
 
* **Sample Call:**

  curl http://pbn.minsky.co/colors


**Set Colors**
----
  Modify the color of squares in the grid.

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[hexColor]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `3 successfull updates. 0 errors.`

* **Sample Call:**

  curl -X PUT http://pbn.minsky.co/?25=ff00ff&32=00ffff&58=ffff00


**Change Grid Size**
----
  Resize the grid

* **URL**

  /size/:width

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `key=[value]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Size Changed`
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `FORBIDDEN`

* **Sample Call:**

  curl -X POST --data "key=fja9h98h398h298fhs" http://pbn.minsky.co/size/15


**Change All Colors**
----
  Set the color of every square on the grid simultaneously.

* **URL**

  /colors/:hex

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `key=[value]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Colors Set`
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `FORBIDDEN`

* **Sample Call:**

  curl -X POST --data "key=fja9h98h398h298fhs" http://pbn.minsky.co/colors/ff00ff

