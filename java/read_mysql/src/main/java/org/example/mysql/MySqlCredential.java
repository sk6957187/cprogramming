package org.example.mysql;

public class MySqlCredential {
    private String driver;
    private String baseUrl;
    private String username;
    private String password;

    public MySqlCredential(String drive, String baseUrl, String username, String password) {
        this.driver = "com.mysql.jdbc.Driver";
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
    }
    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "MySqlCredential{" +
                "driver='" + driver + '\'' +
                ", baseUrl='" + baseUrl + '\'' +
                ", username='" + username + '\'' +
                ", password='" + "*****" + '\'' +
                '}';
    }
}
