function validateForm(): boolean {
    const inputField = document.getElementById("inputField") as HTMLInputElement;
    const input = inputField.value;
  
    // Kiểm tra trường rỗng
    if (input.trim() === "") {
      alert("Vui lòng điền vào trường này.");
      return false;
    }
  
    // Kiểm tra ký tự đặc biệt
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialChars.test(input)) {
      alert("Không được sử dụng ký tự đặc biệt.");
      return false;
    }
  
    // Kiểm tra không sử dụng chỉ một ký tự
    if (input.length === 1) {
      alert("Không được sử dụng chỉ một ký tự.");
      return false;
    }
  
    return true;
  }
  
  export { validateForm };



