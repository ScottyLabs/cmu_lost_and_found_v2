export function UseTemplate(templateType: string) {
    switch (templateType) {
        case "CMUID-CUC":
            return `
            Hello,
            <br><br>Your <b>CMU ID</b> was found and turned into the Information Desk at the <b>Cohon University Center</b>. Please stop by at your convenience to retrieve your item. 
            <br>We are located on the main floor of the <b>Cohon Center</b> by <b>Kirr Commons (black chairs)</b>. If you need help getting into the building since it is currently ID Access Only on the weekends, please call the desk at <b>412-268-2107</b> for assistance. 
            <br>Our current hours are: 8am - midnight (Monday - Friday), and 9am - midnight (Saturday - Sunday).
            <br><br>Thank you,
            <br><b>CUC Lost and Found</b>`;
            
        case "OTHER-CUC":
            return `
            Hello,
            <br><br>An <b>item containing your identifying information</b> was found and turned into the Information Desk at the Cohon University Center. Please stop by at your convenience to retrieve your item. 
            <br>We are located on the main floor of the <b>Cohon Center</b> by <b>Kirr Commons (black chairs)</b>. If you need help getting into the building since it is currently ID Access Only on the weekends, please call the desk at <b>412-268-2107</b> for assistance. 
            <br>Our current hours are: 8am - midnight (Monday - Friday), and 9am - midnight (Saturday - Sunday).
            <br><br>Thank you,
            <br><b>CUC Lost and Found</b>`;
        default:
            return `
            Hello,
            <br>This email was sent in error. Please ignore.`;
    }
}