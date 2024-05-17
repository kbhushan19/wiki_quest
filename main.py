import nltk
import os
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from string import punctuation
import requests
import re
from bs4 import BeautifulSoup as bs

# Download required NLTK resources
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

# File path to save the Wikipedia text
resources_filepath = os.path.join('resources', 'wiki_page.txt')


def get_wiki_text(url_wiki_link='https://en.wikipedia.org/wiki/Amitabh_Bachchan'):
    """
    Fetches the text from a Wikipedia page, cleans it, and saves it to a file.

    :param url_wiki_link: URL of the Wikipedia page to fetch text from (default is Amitabh Bachchan's Wikipedia page)
    :type url_wiki_link: str
    :returns: None
    :description: This function sends a GET request to the specified Wikipedia page, extracts the text from paragraph tags,
                  cleans it by removing references, converts it to lowercase, and saves it to a file.
    """
    response = requests.get(url_wiki_link)
    data = response.content

    soup = bs(data, 'lxml')
    data_text = ''
    for para in soup.find_all('p'):
        data_text += para.text + "\n"
    data_text = data_text.lower()

    # Remove reference numbers in square brackets
    data_text = re.sub(r'\[[0-9]*\]', '', data_text)
    print(data_text, type(data_text))

    # Ensure the resources directory exists
    os.makedirs('resources', exist_ok=True)

    # Save the cleaned text to a file
    with open(resources_filepath, 'w', encoding='utf-8') as fil:
        fil.write(data_text)


# Check if the wiki text file exists, if not, fetch the Wikipedia text
if not os.path.exists(resources_filepath):
    get_wiki_text()

# Read the Wikipedia text from the file
with open(resources_filepath, 'r', encoding='utf-8') as file:
    text = file.read()

# Preprocess the text
sentences = sent_tokenize(text)
stop_words = set(stopwords.words('english') + list(punctuation))
stemmer = PorterStemmer()


def fetch_answer(question):
    """
    Fetches an answer to the input question based on the preprocessed Wikipedia text.

    :param question: The question to be answered
    :type question: str
    :returns: A relevant sentence(s) from the Wikipedia text or a message if no relevant answer is found
    :rtype: str
    :description: This function tokenizes, preprocesses, and stems the input question, then finds and returns the most
                  relevant sentence(s) from the preprocessed Wikipedia text by comparing common tokens.
    """
    # Tokenize, preprocess, and stem the question
    question_tokens = [stemmer.stem(word.lower()) for word in word_tokenize(question) if word.lower() not in stop_words]

    # Find the most relevant sentence(s) based on the question
    relevant_sentences = []
    max_common_tokens = 0
    for sentence in sentences:
        sentence_tokens = [stemmer.stem(word.lower()) for word in word_tokenize(sentence) if
                           word.lower() not in stop_words]
        common_tokens = set(question_tokens).intersection(sentence_tokens)
        if common_tokens:
            if len(common_tokens) > max_common_tokens:
                max_common_tokens = len(common_tokens)
                relevant_sentences = [sentence]
            elif len(common_tokens) == max_common_tokens:
                relevant_sentences.append(sentence)

    if not relevant_sentences:
        return "Apologies, couldn't find a relevant answer in the text. Please try to rephrase your query or delete the 'wiki_page.txt' file in 'resources' dir."
    else:
        resp_text = ''
        for sentence in relevant_sentences:
            resp_text += f"{sentence}\n"
        return resp_text