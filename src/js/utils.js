import { BASE_URL } from "./const";
import { API_KEY } from "./const";
import { hitsPerPage } from "./const";
import axios from "axios";


export const fetchImg = async (userRequest, page) => {
	const res= await axios.get(`${BASE_URL}?key=${API_KEY}&q=${userRequest}&image_type="photo"&safesearch="true"&${page}&per_page=${hitsPerPage}&page=${page}&orientation="horizontal"`)
		return res.data;
}
		
	
		
	
	
	
	
