package com.focus.weborder.parameterdownload;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@SuppressWarnings("serial")
@Entity
@Table(name = "parameter_download")
public class ParameterDownload {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	@Column(name = "KODE", length = 30)
	private String kode;
	
	@Column(name = "NAMA", length = 50)
	private String nama;
	
	@Column(name = "JENIS_PERIODE", length = 50)
	private String jenisPeriode;
	
	@Column(name = "PREFIX", length = 50)
	private String prefix;
	
	@Column(name = "PATH", length = 225)
	private String path;
	
	@Column(name = "LAST_SHOW", length = 11)
	private Integer lastShow;
	
	@Column(name = "INC_CURRENT", length = 10)
	private String incCurrent;
	
	@Column(name = "COMPANY", length = 10)
	private String company;
	
	@Column(name = "JENIS_FILE", length = 20)
	private String jenisFile;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getKode() {
		return kode;
	}

	public void setKode(String kode) {
		this.kode = kode;
	}

	public String getNama() {
		return nama;
	}

	public void setNama(String nama) {
		this.nama = nama;
	}

	public String getJenisPeriode() {
		return jenisPeriode;
	}

	public void setJenisPeriode(String jenisPeriode) {
		this.jenisPeriode = jenisPeriode;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Integer getLastShow() {
		return lastShow;
	}

	public void setLastShow(Integer lastShow) {
		this.lastShow = lastShow;
	}

	public String getIncCurrent() {
		return incCurrent;
	}

	public void setIncCurrent(String incCurrent) {
		this.incCurrent = incCurrent;
	}
	
	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getJenisFile() {
		return jenisFile;
	}

	public void setJenisFile(String jenisFile) {
		this.jenisFile = jenisFile;
	}

}
