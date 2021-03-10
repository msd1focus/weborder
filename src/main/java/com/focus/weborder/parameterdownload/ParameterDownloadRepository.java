package com.focus.weborder.parameterdownload;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ParameterDownloadRepository extends JpaRepository<ParameterDownload, Long>{
	
    @Query("SELECT p FROM ParameterDownload p WHERE p.id = :id")
    ParameterDownload getById(@Param("id") Integer id);
    
    @Query("SELECT p FROM ParameterDownload p ")
    List<ParameterDownload> getAll();
    
}
