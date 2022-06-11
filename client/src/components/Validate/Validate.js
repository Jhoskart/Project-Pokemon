
function validate(data) {

  const validateUrl = (Url) => {
    const regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/);
    return regex.test(Url)};
  
  const validateName = (name) => {
    const regex = new RegExp(/^[0-9,$]*$/);
    return regex.test(name)
  }
  // const validateNumber = (number) => {
  //   const regex = new RegExp(/^([0-9]|[1-9][0-9]|100)$/);
  //   return regex.test(number)
  // }
    let errors = {};
    if (!data.name || data.name.length > 10)  errors.name = "No more than 10 characters!";
    if (validateName(data.name)) errors.name = "Name is required and must contain only letters!";
    if (data.life < 0 || data.life > 100) errors.life = "Between 0 and 100";
    if (data.attack < 0 || data.attack > 100) errors.attack = "Between 0 and 100";
    if (data.defense < 0 || data.defense > 100) errors.defense = "Between 0 and 100";
    if (data.speed < 0 || data.speed > 100) errors.speed = "Between 0 and 100";
    if (data.height < 0 || data.height > 100) errors.height = "Between 0 and 100";
    if (data.weight < 0 || data.weight > 600) errors.weight = "Between 0 and 100";
    if (!validateUrl(data.image) && data.image !== "") { errors.image = "Must be a image url with format jpg, gif, png!";
    }
    return errors;
  }
  
export default validate;