﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.18408
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EMI.Website.TablasService {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="TABLAS", Namespace="http://schemas.datacontract.org/2004/07/EMI.Wcf.Model")]
    [System.SerializableAttribute()]
    public partial class TABLAS : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string DESCRIPCIONField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private int ID_TABLAField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string NOMBREField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string DESCRIPCION {
            get {
                return this.DESCRIPCIONField;
            }
            set {
                if ((object.ReferenceEquals(this.DESCRIPCIONField, value) != true)) {
                    this.DESCRIPCIONField = value;
                    this.RaisePropertyChanged("DESCRIPCION");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int ID_TABLA {
            get {
                return this.ID_TABLAField;
            }
            set {
                if ((this.ID_TABLAField.Equals(value) != true)) {
                    this.ID_TABLAField = value;
                    this.RaisePropertyChanged("ID_TABLA");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string NOMBRE {
            get {
                return this.NOMBREField;
            }
            set {
                if ((object.ReferenceEquals(this.NOMBREField, value) != true)) {
                    this.NOMBREField = value;
                    this.RaisePropertyChanged("NOMBRE");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="TablasService.ITablas")]
    public interface ITablas {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITablas/ObtenerTablas", ReplyAction="http://tempuri.org/ITablas/ObtenerTablasResponse")]
        EMI.Website.TablasService.TABLAS[] ObtenerTablas();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITablas/ObtenerTablas", ReplyAction="http://tempuri.org/ITablas/ObtenerTablasResponse")]
        System.Threading.Tasks.Task<EMI.Website.TablasService.TABLAS[]> ObtenerTablasAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface ITablasChannel : EMI.Website.TablasService.ITablas, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class TablasClient : System.ServiceModel.ClientBase<EMI.Website.TablasService.ITablas>, EMI.Website.TablasService.ITablas {
        
        public TablasClient() {
        }
        
        public TablasClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public TablasClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public TablasClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public TablasClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public EMI.Website.TablasService.TABLAS[] ObtenerTablas() {
            return base.Channel.ObtenerTablas();
        }
        
        public System.Threading.Tasks.Task<EMI.Website.TablasService.TABLAS[]> ObtenerTablasAsync() {
            return base.Channel.ObtenerTablasAsync();
        }
    }
}
