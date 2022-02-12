export default function setTemplate(templateType: string) {
    switch (templateType) {
        case "CMUID-CUC":
            return `
            Hello,
 
            Your CMU ID was found and turned into the Information Desk at the Cohon University Center. Please stop by at your convenience to retrieve your item. 
             
            We are located on the main floor of the Cohon Center by Kirr Commons (black chairs). If you need help getting into the building since it is currently ID Access Only on the weekends, please call the desk at 412-268-2107 for assistance. 
             
            Our current hours are: 8am - midnight (Monday - Friday), and 9am - midnight (Saturday - Sunday).
             
            Thank you,
            CUC Lost and Found`;
            
        case "OTHER-CUC":
            return `
            Hello,
 
            An item containing your identifying information was found and turned into the Information Desk at the Cohon University Center. Please stop by at your convenience to retrieve your item. 
            
            We are located on the main floor of the Cohon Center by Kirr Commons (black chairs). If you need help getting into the building since it is currently ID Access Only on the weekends, please call the desk at 412-268-2107 for assistance. 
            
            Our current hours are: 8am - midnight (Monday - Friday), and 9am - midnight (Saturday - Sunday).
            
            Thank you,
            CUC Lost and Found`;
        default:
            return "";
    }
}