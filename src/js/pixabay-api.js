import { BASE_URL } from "./const";
import { API_KEY } from "./const";
import { hitsPerPage } from "./const";
import axios from "axios";
 
 

export const fetchImg = async (userRequest, page) => {
	const options = {
		params:{
		image_type:"photo",
		orientation:"horizontal",
		safesearch:"true",
		per_page: `${hitsPerPage}`,
		page:`${page}`,
		key: `${API_KEY}`,
		q:`${userRequest}`
	}}
	const res= await axios.get(`${BASE_URL}`, options)
		return res.data;
}
		
	
		
	
	
	
	
