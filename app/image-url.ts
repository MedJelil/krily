const getCroppedImageUrl = (url: string) => {
  const target = "upload/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "c_crop,w_600,h_400/" + url.slice(index);
};
export default getCroppedImageUrl;



// /upload/c_crop,w_600,h_400