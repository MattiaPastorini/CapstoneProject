package mattiapastorini.CapStone_FantaF1.Payloads;


public class NewUserPayload {
    public String username;
    public String email;
    public String password;


    public NewUserPayload(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
