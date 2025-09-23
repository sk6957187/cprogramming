package com.example.springTest_Shipment;

public class ResponseStructute<Shipment> {
	
	private int statusCode;
	private String message;
	private Shipment data;
	
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Shipment getData() {
		return data;
	}
	public void setData(Shipment data) {
		this.data = data;
	}

}
