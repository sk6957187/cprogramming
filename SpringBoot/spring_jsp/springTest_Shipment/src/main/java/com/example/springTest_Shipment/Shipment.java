package com.example.springTest_Shipment;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Shipment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String trackingNumber;
	private String origin;
	private String destination;
	private LocalDate BookingDate;
	private LocalDate DelDate;
	private String status;
	private String carrier;
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	public String getTrackingNumber() {
		return trackingNumber;
	}
	public void setTrackingNumber(String trackingNumber) {
		this.trackingNumber = trackingNumber;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public LocalDate getBookingDate() {
		return BookingDate;
	}
	public void setBookingDate(LocalDate bookingDate) {
		BookingDate = bookingDate;
	}
	public LocalDate getDelDate() {
		return DelDate;
	}
	public void setDelDate(LocalDate delDate) {
		DelDate = delDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCarrier() {
		return carrier;
	}
	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}
	
	@Override
	public String toString() {
		return "Shipment [id=" + id + ", trackingNumber=" + trackingNumber + ", origin=" + origin + ", destination="
				+ destination + ", BookingDate=" + BookingDate + ", DelDate=" + DelDate + ", status=" + status
				+ ", carrier=" + carrier + "]";
	}
	
	
	
}
