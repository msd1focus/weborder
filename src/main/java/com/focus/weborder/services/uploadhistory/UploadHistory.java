package com.focus.weborder.services.uploadhistory;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "UPLOAD_HISTORY")
public class UploadHistory {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="UPLOAD_ID")
	private Long uploadId;
	@Column(name="UPLOAD_TYPE")
	private String uploadType;
	@Column(name="UPLOAD_STATUS")
	private String uploadStatus;
	@Column(name="UPLOAD_DESCRIPTION")
	private String uploadDescription;
	@Column(name="UPLOAD_FILE_NAME")
	private String uploadFileName;
	@Column(name="UPLOAD_DIR_TO")
	private String uploadDirTo;
	@Column(name="UPLOAD_BY")
	private String uploadBy;
	@Column(name="UPLOAD_TIME")
	private Date uploadTime;
	@Column(name="PROCESSED_TIME")
	private Date processedTime;
	
	public UploadHistory() {
	}

	public UploadHistory(
			Long uploadId, String uploadType, String uploadStatus,
			String uploadDescription, String uploadFileName,
			String uploadDirTo, String uploadBy,
			Date uploadTime, Date processedTime) {
		super();
		this.uploadId = uploadId;
		this.uploadType = uploadType;
		this.uploadStatus = uploadStatus;
		this.uploadDescription = uploadDescription;
		this.uploadFileName = uploadFileName;
		this.uploadDirTo = uploadDirTo;
		this.uploadBy = uploadBy;
		this.uploadTime = uploadTime;
		this.processedTime = processedTime;
	}

	public Long getUploadId() {
		return uploadId;
	}

	public void setUploadId(Long uploadId) {
		this.uploadId = uploadId;
	}

	public String getUploadType() {
		return uploadType;
	}

	public void setUploadType(String uploadType) {
		this.uploadType = uploadType;
	}

	public String getUploadStatus() {
		return uploadStatus;
	}

	public void setUploadStatus(String uploadStatus) {
		this.uploadStatus = uploadStatus;
	}

	public String getUploadDescription() {
		return uploadDescription;
	}

	public void setUploadDescription(String uploadDescription) {
		this.uploadDescription = uploadDescription;
	}

	public String getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}

	public String getUploadDirTo() {
		return uploadDirTo;
	}

	public void setUploadDirTo(String uploadDirTo) {
		this.uploadDirTo = uploadDirTo;
	}

	public String getUploadBy() {
		return uploadBy;
	}

	public void setUploadBy(String uploadBy) {
		this.uploadBy = uploadBy;
	}

	public Date getUploadTime() {
		return uploadTime;
	}

	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	public Date getProcessedTime() {
		return processedTime;
	}

	public void setProcessedTime(Date processedTime) {
		this.processedTime = processedTime;
	}
	
}
