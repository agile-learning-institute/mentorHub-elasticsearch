from src.services import elasticsearch_service, kafka_service, kafka_connector_service
import logging
logger = logging.getLogger(__name__)

def configure_cdc_pipeline():
    """ Configure the Change Data Capture pipeline """
    
    # Make sure the elasticsearch service is up, 
    # and that the required indexes exist, creating them if they don't exist.
    elastic = elasticsearch_service.elasticsearch_database()
    elastic.connect()
    elastic.verify_index()
    elastic.disconnect()

    # Make sure the Kafka Event bus is running, 
    # and that the required topoics exist, creating them if they don't exist.
    kafka = kafka_service.kafka_bus()
    kafka.connect()
    kafka.verify_topic()
    kafka.disconnect()

    # Make sure the connector is running, 
    # Configure data sources and syncs
    # Trigger a full syncronization of all sources
    connector = kafka_connector_service.kafka_connector()
    connector.connect()
    connector.configure_sources()
    connector.configure_syncs()
    connector.run_sync()
    connector.disconnect()

if __name__ == '__main__':
    try:
        configure_cdc_pipeline()        
    except Exception as e:
        logger.error(f"Pipeline Configuration Failed! Exception: {e}")