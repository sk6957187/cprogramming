package com.example.springTest_Shipment;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/shipment")
public class Controller {
	@Autowired
	private ShipmentRepository shipmentRepository;
	
	@GetMapping
	public ResponseEntity<ResponseStructute<List<Shipment>>> getShipment(){
		List<Shipment> ship = shipmentRepository.findAll();
		ResponseStructute<List<Shipment>> str = new ResponseStructute<List<Shipment>>();
		if(ship.size()>0) {
			str.setStatusCode(HttpStatus.OK.value());
			str.setMessage("success");
			str.setData(ship);
			return new ResponseEntity<ResponseStructute<List<Shipment>>>(str, HttpStatus.OK);
		}
		else {
			str.setStatusCode(HttpStatus.NOT_FOUND.value());
			str.setMessage("data not found");
			return new ResponseEntity<ResponseStructute<List<Shipment>>>(str, HttpStatus.OK);
		}
	}
	
	@PostMapping
	public ResponseEntity<ResponseStructute<Shipment>> setShipment(@RequestBody Shipment shipment){
		shipmentRepository.save(shipment);
		ResponseStructute<Shipment> str = new ResponseStructute<Shipment>();
		str.setStatusCode(HttpStatus.OK.value());
		str.setMessage("success");
		str.setData(shipment);
		return new ResponseEntity<ResponseStructute<Shipment>>(str, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructute<Shipment>> getShipmentById(@PathVariable int id){
		Optional<Shipment> opt = shipmentRepository.findById(id);
		ResponseStructute<Shipment> str = new ResponseStructute<Shipment>();
		if(opt != null) {
			str.setStatusCode(HttpStatus.OK.value());
			str.setMessage("success");
			str.setData(opt.get());
			return new ResponseEntity<ResponseStructute<Shipment>>(str, HttpStatus.OK);
		} else {
			str.setStatusCode(HttpStatus.NOT_FOUND.value());
			str.setMessage("Data not found");
			return new ResponseEntity<ResponseStructute<Shipment>>(str, HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<ResponseStructute<Shipment>> updateById( @RequestBody Shipment ship){
		if (shipmentRepository.existsById(ship.getId())) {
	        shipmentRepository.save(ship);
	        ResponseStructute<Shipment> structure = new ResponseStructute<Shipment>();
			structure.setData(ship);
			structure.setMessage("Successfully updated");
			structure.setStatusCode(HttpStatus.OK.value());
			return new ResponseEntity<ResponseStructute<Shipment>>(structure, HttpStatus.OK);
	    }else {
	    	ResponseStructute<Shipment> structure = new ResponseStructute<Shipment>();
			structure.setStatusCode(HttpStatus.NOT_FOUND.value());
			structure.setMessage("Data not found");
			return new ResponseEntity<ResponseStructute<Shipment>>(structure, HttpStatus.NOT_FOUND);
	    }
	}
}
