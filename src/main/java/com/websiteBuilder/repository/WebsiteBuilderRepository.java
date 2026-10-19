package com.websiteBuilder.repository;

import com.websiteBuilder.entity.WebsiteBuilderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WebsiteBuilderRepository extends JpaRepository<WebsiteBuilderEntity,Long> {

    List<WebsiteBuilderEntity> findAllByOrderByCreatedAtAscIdAsc();
}
