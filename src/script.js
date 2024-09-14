import "./styles.css";
import { fetchLocation } from "./modules/handleAPI";

document.querySelector("form").addEventListener("submit", fetchLocation);


