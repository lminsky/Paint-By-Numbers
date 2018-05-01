Paint by Numbers
======

See the grid [here](http://pbn.minsky.co).

Access to the API is rate limited. Use the Get Rate Limit command below to find the current limit.

**Get Size**
----
  Fetches the width and height of the grid.

* **URL**

  /api/size/

* **Method:**

  `GET`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "size": 100 }`
 
* **Sample Call:**

  `curl http://pbn.minsky.co/api/size`


**Get Colors**
----
  Fetches the color of each square in the grid.

* **URL**

  /api/colors/

* **Method:**

  `GET`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "squares": ["abcdef","abcdef","abcdef","abcdef","abcdef"] }`
 
* **Sample Call:**

  `curl http://pbn.minsky.co/api/colors`


**Get Rate Limit**
----
  Returns how many calls can be a time period.

* **URL**

  /api/rate/

* **Method:**

  `GET`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "minutes": 1,"calls": 20 }`
 
* **Sample Call:**

  `curl http://pbn.minsky.co/api/rate`


**Set Colors**
----
  Modify the color of squares in the grid.

* **URL**

  /api/

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[hexColor]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `3 successfull updates. 0 errors.`

* **Sample Call:**

  `curl -X PUT http://pbn.minsky.co/api/?25=ff00ff&32=00ffff&58=ffff00`


**Set Grid Size**
----
  Resize the grid

* **URL**

  /admin/size/:width

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

  `curl -X POST --data "key=fja9h98h398h298fhs" http://pbn.minsky.co/admin/size/15`


**Set All Colors**
----
  Set the color of every square on the grid simultaneously.

* **URL**

  /admin/colors/:hex

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

  `curl -X POST --data "key=fja9h98h398h298fhs" http://pbn.minsky.co/admin/colors/ff00ff`




**Set Server Key**
----
  Update the server key

* **URL**

  /admin/key

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `key=[old key]`
   `new=[new key]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Key Changed`
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `FORBIDDEN`

* **Sample Call:**

  `curl -X POST --data "{"key":"oldKey","new":"newKey"}" http://pbn.minsky.co/admin/key/`

