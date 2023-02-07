import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import axios from 'axios'

import { passCsrfToken } from '../helpers/csrftoken'

pagesPrototype = {
  page: 0,
  pages: 0,
  perPages: 0
}

const usePages = (url, url_back='') => {

}