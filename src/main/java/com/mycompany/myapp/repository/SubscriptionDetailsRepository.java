package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SubscriptionDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SubscriptionDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionDetailsRepository extends JpaRepository<SubscriptionDetails, Long> {}
