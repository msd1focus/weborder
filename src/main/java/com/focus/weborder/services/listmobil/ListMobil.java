package com.focus.weborder.services.listmobil;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "LISTMOBIL")
public class ListMobil {

	@Id
	@Column(name="MOBIL_ID")
	private Long mobilId;
	@Column(name="MOBIL_DESC")
	private String mobilDesc;
	@Column(name="MOBIL_PANJANG")
	private Double mobilPanjang;
	@Column(name="MOBIL_LEBAR")
	private Double mobilLebar;
	@Column(name="MOBIL_TINGGI")
	private Double mobilTinggi;
	
	public ListMobil() {
		
	}
	
	public ListMobil(Long mobilId, String mobilDesc, Double mobilPanjang,
			Double mobilLebar, Double mobilTinggi) {
		super();
		this.mobilId = mobilId;
		this.mobilDesc = mobilDesc;
		this.mobilPanjang = mobilPanjang;
		this.mobilLebar = mobilLebar;
		this.mobilTinggi = mobilTinggi;
	}

	public Long getMobilId() {
		return mobilId;
	}

	public void setMobilId(Long mobilId) {
		this.mobilId = mobilId;
	}

	public String getMobilDesc() {
		return mobilDesc;
	}

	public void setMobilDesc(String mobilDesc) {
		this.mobilDesc = mobilDesc;
	}

	public Double getMobilPanjang() {
		return mobilPanjang;
	}

	public void setMobilPanjang(Double mobilPanjang) {
		this.mobilPanjang = mobilPanjang;
	}

	public Double getMobilLebar() {
		return mobilLebar;
	}

	public void setMobilLebar(Double mobilLebar) {
		this.mobilLebar = mobilLebar;
	}

	public Double getMobilTinggi() {
		return mobilTinggi;
	}

	public void setMobilTinggi(Double mobilTinggi) {
		this.mobilTinggi = mobilTinggi;
	}

}
