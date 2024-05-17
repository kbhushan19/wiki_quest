# Wiki Quest

Wiki Quest is a simple Flask web application that fetches and displays answers to questions based on a preprocessed Wikipedia article. The project uses NLTK for text processing and BeautifulSoup for web scraping.

## Installation

Follow these steps to install and run the application:

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/wiki_quest.git
    ```

2. Navigate to the project directory:

    ```sh
    cd wiki_quest
    ```

3. Create a virtual environment:

    ```sh
    python -m venv venv
    ```

4. Activate the virtual environment:

    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS and Linux:
        ```sh
        source venv/bin/activate
        ```

5. Install the required dependencies:

    ```sh
    pip install -r requirements.txt
    ```

## Running the Application

1. Ensure you are in the project directory and the virtual environment is activated.
2. Start the Flask application:

    ```sh
    python app.py
    ```

3. Open your web browser and navigate to:

    ```
    http://localhost:8008/
    ```

## Usage

- On the main page, enter your question in the provided input field and submit it.
- The application will process the question and display the most relevant answer based on the preprocessed Wikipedia text.
