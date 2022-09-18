export function UseTemplate(templateType: string, building: string) {
  const messageContents = () => {
    let location = "";
    let message = "";
    switch (building) {
      case "CUC":
        location = "the Information Desk at the <b>Cohon University Center</b>";
        message = `We are located on the main floor of the <b>Cohon Center</b> by <b>Kirr Commons (black chairs)</b>.
                <br>If you need help getting into the building since it is currently ID Access Only on the weekends, please call the desk at <b>412-268-2107</b> for assistance.
                <br>Our current hours are: 8am - midnight (Monday - Friday), and 9am - midnight (Saturday - Sunday).`;
        break;
      case "GHC":
        location = "<b>Catherine Copetas' room</b>";
        // Message needed
        message = `Catherine's room is located on <b>Gates 6203</b>. 
                <br>If you cannot access her room (Gates elevators are CS-restricted on weekends), please contact Catherine by emailing her at copetas@cs.cmu.edu or by calling her at 412-268-8525.`;
        break;
      case "TEP":
        location = "<b>tepper building ?<\b>";
        message = "location? times to pick it up? uhhh";
        break;
      default:
        return [];
    }
    return [location, message];
  };

  const [location, message] = messageContents();

  switch (templateType) {
    case "CMUID":
      return `
            Your CMU ID was found and turned into ${location}. 
            Please stop by at your convenience to retrieve your item. 
            <br>${message}`;
    case "OTHER":
      return `
            An item containing your identifying information was found and turned into ${location}. 
            Please stop by at your convenience to retrieve your item. 
            <br>${message}`;
    default:
      return `
            This email was sent in error. Please ignore.`;
  }
}
