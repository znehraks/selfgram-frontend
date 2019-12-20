const PreventSpace = text => {
  let textP;
  for (let i = 0; i < text.value.length; i++) {
    textP = text.value.replace(/ /gi, "");
  }
  if (text.value != "" && textP != "") {
    return text.value;
  } else {;
    return null;
  }
};

export default PreventSpace;
