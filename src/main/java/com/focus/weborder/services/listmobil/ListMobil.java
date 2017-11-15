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
	private Long mobilPanjang;
	@Column(name="MOBIL_LEBAR")
	private Long mobilLebar;
	@Column(name="MOBIL_TINGGI")
	private Long mobilTinggi;
	
	public ListMobil() {
		
	}
	
	public ListMobil(Long mobilId, String mobilDesc, Long mobilPanjang,
			Long mobilLebar, Long mobilTinggi) {
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

	public Long getMobilPanjang() {
		return mobilPanjang;
	}

	public void setMobilPanjang(Long mobilPanjang) {
		this.mobilPanjang = mobilPanjang;
	}

	public Long getMobilLebar() {
		return mobilLebar;
	}

	public void setMobilLebar(Long mobilLebar) {
		this.mobilLebar = mobilLebar;
	}

	public Long getMobilTinggi() {
		return mobilTinggi;
	}

	public void setMobilTinggi(Long mobilTinggi) {
		this.mobilTinggi = mobilTinggi;
	}

}
